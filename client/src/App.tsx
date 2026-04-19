
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Navbar } from './components/Navbar';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRecords } from './pages/AdminRecords';
import { MemberDashboard } from './pages/MemberDashboard';
import { MemberIssues } from './pages/MemberIssues';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/register" element={<AuthPage />} />
                        
                        <Route element={<PrivateRoute roles={['ADMIN']} />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/admin/records" element={<AdminRecords />} />
                        </Route>

                        <Route element={<PrivateRoute roles={['MEMBER']} />}>
                            <Route path="/member" element={<MemberDashboard />} />
                            <Route path="/member/my-issues" element={<MemberIssues />} />
                        </Route>
                        
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
