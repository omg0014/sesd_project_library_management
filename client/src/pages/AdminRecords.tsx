import { useState, useEffect } from 'react';
import axios from 'axios';

export const AdminRecords = () => {
    const [records, setRecords] = useState<any[]>([]);

    const fetchRecords = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/issues/all');
            setRecords(res.data.data);
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="container">
            <h1 className="text-gradient">Borrowed Books Records</h1>
            <div className="glass-container">
                <table className="table-glass">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Member Name</th>
                            <th>Email & Phone</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Fine Assigned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(r => (
                            <tr key={r._id}>
                                <td>{r.bookId?.title || 'Deleted Book'}</td>
                                <td>{r.userId?.name || 'Unknown User'}</td>
                                <td>
                                    <div>{r.userId?.email || 'N/A'}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>{r.userId?.phoneNumber || 'No phone'}</div>
                                </td>
                                <td>{new Date(r.issueDate).toLocaleDateString()}</td>
                                <td>{new Date(r.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge ${r.status === 'ISSUED' ? 'badge-warning' : 'badge-success'}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td>${r.fineAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                        {records.length === 0 && (
                            <tr><td colSpan={7} style={{ textAlign: 'center' }}>No active or past issues found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
