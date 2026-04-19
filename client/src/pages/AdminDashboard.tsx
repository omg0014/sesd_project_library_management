import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

export const AdminDashboard = () => {
    const [books, setBooks] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [totalCopies, setTotalCopies] = useState(1);

    const fetchBooks = async () => {
        const res = await axios.get('/api/books/search');
        setBooks(res.data.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('/api/books', { title, author, category: 'General', totalCopies });
        setTitle('');
        setAuthor('');
        setTotalCopies(1);
        fetchBooks();
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/books/${id}`);
        fetchBooks();
    };

    return (
        <div className="container">
            <h1 className="text-gradient">Admin Dashboard</h1>

            <div className="glass-container" style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, paddingBottom: '0.5rem' }}>Library Operations</h3>
                    <p className="text-muted" style={{ margin: 0 }}>View who currently has which books and manage fines.</p>
                </div>
                <a href="/admin/records" className="btn" style={{ textDecoration: 'none' }}>
                    View Borrowed Records →
                </a>
            </div>
            
            <div className="glass-container" style={{ marginBottom: '2rem' }}>
                <h3>Add New Book</h3>
                <form onSubmit={handleAddBook} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input type="text" placeholder="Title" className="input-glass" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ marginBottom: 0 }} />
                    <input type="text" placeholder="Author" className="input-glass" value={author} onChange={(e) => setAuthor(e.target.value)} required style={{ marginBottom: 0 }} />
                    <input type="number" placeholder="Copies" className="input-glass" value={totalCopies} onChange={(e) => setTotalCopies(Number(e.target.value))} min={1} required style={{ marginBottom: 0, width: '100px' }} />
                    <button type="submit" className="btn"><Plus size={18} /> Add</button>
                </form>
            </div>

            <div className="glass-container">
                <h3>Book Inventory</h3>
                <table className="table-glass">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Total</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.totalCopies}</td>
                                <td>
                                    <span className={`badge ${book.availableCopies > 0 ? 'badge-success' : 'badge-danger'}`}>
                                        {book.availableCopies}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(book._id)} className="btn btn-danger" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
