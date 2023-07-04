import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../services/auth.service'; // Adjust the path according to your project structure

export default function LogoutButton({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <Link to={'/'} className="nav-link" onClick={handleLogout}>
            Logout
        </Link>
    );
}
