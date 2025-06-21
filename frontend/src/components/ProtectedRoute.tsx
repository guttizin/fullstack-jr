import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { openLoginModal } = useUI();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            openLoginModal(location.pathname);
        }
    }, [isAuthenticated, location.pathname, openLoginModal]);

    if (!isAuthenticated) {
        // You can return a loading spinner or null here,
        // while the modal is being opened.
        return null; 
    }

    return children;
};

export default ProtectedRoute; 