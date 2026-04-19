import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data.data.token, res.data.data.user);
            if (res.data.data.user.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/member');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card glass-container">
                <h2 className="text-gradient">Welcome Back</h2>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Login to your premium account</p>
                {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="input-glass"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input-glass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
                        Login
                    </button>
                </form>
                
                <p className="text-muted" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};
