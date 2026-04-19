
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ roles }: { roles?: string[] }) => {
    const { user, token } = useAuth();

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
