import { useState, useEffect } from 'react';
import axios from 'axios';

export const MemberIssues = () => {
    const [issues, setIssues] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchIssues = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/issues/my-issues');
            setIssues(res.data.data);
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleReturn = async (bookId: string) => {
        try {
            setError('');
            setSuccess('');
            const res = await axios.post('http://localhost:5000/api/issues/return', { bookId });
            setSuccess(`Book returned successfully! \nFine Billed: $${res.data.data.fineAmount.toFixed(2)}`);
            fetchIssues();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to return book');
        }
    };

    return (
        <div className="container">
            <h1 className="text-gradient">My Borrowed Books</h1>
            
            {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>{error}</div>}
            {success && <div className="badge badge-success" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', fontSize: '1rem', whiteSpace: 'pre-wrap' }}>{success}</div>}

            <div className="glass-container">
                <table className="table-glass">
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map(issue => (
                            <tr key={issue._id}>
                                <td>{issue.bookId?.title || 'Deleted Book'}</td>
                                <td>{issue.bookId?.author || 'Unknown'}</td>
                                <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                                <td>{new Date(issue.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge ${issue.status === 'ISSUED' ? 'badge-warning' : 'badge-success'}`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td>
                                    {issue.status === 'ISSUED' && (
                                        <button 
                                            onClick={() => handleReturn(issue.bookId?._id)} 
                                            className="btn" 
                                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                        >
                                            Return Book
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {issues.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>You have not borrowed any books yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
