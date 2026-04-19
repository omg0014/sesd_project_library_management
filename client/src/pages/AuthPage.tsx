import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Library } from 'lucide-react';
import './AuthPage.css';

export const AuthPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('MEMBER');

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
        setError('');
    }, [location.pathname]);

    const handleToggle = (toLogin: boolean) => {
        setIsLogin(toLogin);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                login(res.data.data.token, res.data.data.user);
                navigate(res.data.data.user.role === 'ADMIN' ? '/admin' : '/member');
            } else {
                await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phoneNumber, role });
                setIsLogin(true); // Switch to login after successful register
                setError('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-container">
            {/* Background Decorators */}
            <div className="bg-circle circle-1"></div>
            <div className="bg-circle circle-2"></div>
            
            <div className="auth-split-wrapper">
                
                {/* Left Branding Section */}
                <div className="auth-branding">
                    <div className="brand-content">
                        <Library size={64} className="brand-icon" />
                        <h1>Grow Your Knowledge</h1>
                        <p>Join our calm, academic community and seamlessly manage your physical books.</p>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="auth-form-section">
                    <div className="auth-glass-card">
                        
                        <div className="auth-toggle">
                            <button 
                                type="button"
                                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                                onClick={() => handleToggle(true)}
                            >
                                Login
                            </button>
                            <button 
                                type="button"
                                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                                onClick={() => handleToggle(false)}
                            >
                                Register
                            </button>
                            <div className={`toggle-slider ${!isLogin ? 'slide-right' : ''}`}></div>
                        </div>

                        <div className="form-header">
                            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                            <p className="text-muted">{isLogin ? 'Sign in to borrow books' : 'Join our premium library'}</p>
                        </div>

                        {error && (
                            <div className={`badge ${error.includes('successful') ? 'badge-success' : 'badge-danger'} error-fade-in`}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {!isLogin && (
                                <div className="floating-input-group">
                                    <input 
                                        type="text" 
                                        id="name"
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required={!isLogin} 
                                        placeholder=" "
                                    />
                                    <label htmlFor="name">Full Name</label>
                                </div>
                            )}

                            <div className="floating-input-group">
                                <input 
                                    type="email" 
                                    id="email"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder=" "
                                />
                                <label htmlFor="email">Email Address</label>
                            </div>

                            {!isLogin && (
                                <div className="floating-input-group">
                                    <input 
                                        type="tel" 
                                        id="phone"
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        required={!isLogin} 
                                        placeholder=" "
                                    />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                            )}

                            <div className="floating-input-group">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    id="password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder=" "
                                />
                                <label htmlFor="password">Password</label>
                                <button 
                                    type="button" 
                                    className="pwd-toggle" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {!isLogin && (
                                <div className="floating-input-group">
                                    <select 
                                        id="role"
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className="role-select"
                                    >
                                        <option value="MEMBER">Member</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            )}

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
