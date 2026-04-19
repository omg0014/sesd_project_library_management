import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

export const MemberDashboard = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [dueDates, setDueDates] = useState<{ [key: string]: string }>({});

    const searchBooks = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/books/search?q=${query}`);
            setBooks(res.data.data);
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        searchBooks();
    }, []);

    const handleIssue = async (bookId: string) => {
        try {
            setError('');
            setSuccess('');
            const requestedDueDate = dueDates[bookId];
            if (!requestedDueDate) {
                setError('Please select a return due-date before issuing.');
                return;
            }
            await axios.post('http://localhost:5000/api/issues/issue', { bookId, requestedDueDate });
            setSuccess('Book issued successfully!');
            searchBooks(); // Refresh availability
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to issue book');
        }
    };

    return (
        <div className="container">
            <h1 className="text-gradient">Library Portal</h1>
            
            {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', fontSize: '1rem' }}>{error}</div>}
            {success && <div className="badge badge-success" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', fontSize: '1rem' }}>{success}</div>}

            <div className="glass-container" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input 
                        type="text" 
                        placeholder="Search books by title or author..." 
                        className="input-glass" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        style={{ marginBottom: 0 }} 
                        onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
                    />
                    <button onClick={searchBooks} className="btn"><Search size={18} /> Search</button>
                </div>
            </div>

            <div className="glass-container">
                <h3>Available Books</h3>
                <table className="table-glass">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Availability</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <span className={`badge ${book.availableCopies > 0 ? 'badge-success' : 'badge-danger'}`}>
                                        {book.availableCopies > 0 ? `${book.availableCopies} Copies` : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    {book.availableCopies > 0 && (
                                        <input 
                                            type="date" 
                                            className="input-glass" 
                                            style={{ marginBottom: 0, padding: '0.25rem', width: '130px', marginRight: '0.5rem', display: 'inline-block' }}
                                            onChange={(e) => setDueDates({...dueDates, [book._id]: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    )}
                                    <button 
                                        onClick={() => handleIssue(book._id)} 
                                        disabled={book.availableCopies === 0}
                                        className={`btn ${book.availableCopies === 0 ? 'btn-secondary' : ''}`} 
                                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                    >
                                        Issue Book
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
