
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut } from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand flex-center" style={{ gap: '0.5rem' }}>
                <BookOpen color="var(--secondary)" />
                <span>LMS Premium</span>
            </Link>
            <div className="nav-links">
                {user.role === 'ADMIN' ? (
                    <>
                        <Link to="/admin" className="nav-link">Dashboard</Link>
                    </>
                ) : (
                    <>
                        <Link to="/member" className="nav-link">Dashboard</Link>
                        <Link to="/member/my-issues" className="nav-link">My Issues</Link>
                    </>
                )}
                <button onClick={handleLogout} className="btn-secondary flex-center" style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--surface-border)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}>
                    <LogOut size={18} />
                </button>
            </div>
        </nav>
    );
};
