import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { NavButton } from './NavbarElements';

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <NavButton onClick={handleLogout}>
            Wyloguj się
        </NavButton>
    );
};

export default LogoutButton;