import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('MEMBER');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phoneNumber, role });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-container">
                <h2 className="text-gradient">Create Account</h2>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Join our premium library</p>
                {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" className="input-glass" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email Address" className="input-glass" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="tel" placeholder="Phone Number" className="input-glass" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <input type="password" placeholder="Password" className="input-glass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <select className="input-glass" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
                        Register
                    </button>
                </form>
                
                <p className="text-muted" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};
