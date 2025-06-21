import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import API_URL from '../config';
import axios from 'axios';
import type { Customer } from '../types/customer';

interface AuthContextType {
    isAuthenticated: boolean;
    user: Customer | null;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => void;
    register: (customerData: Omit<Customer, 'id' | 'order'>) => Promise<Customer | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Customer | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string) => {
        // In a real app, you'd verify password. Here we just fetch user by email.
        try {
            const response = await axios.post(`${API_URL}/customers/check-email`, { email });
            const { exists, customer } = response.data;

            if (exists && customer) {
                setUser(customer);
                localStorage.setItem('user', JSON.stringify(customer));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const register = async (customerData: Omit<Customer, 'id' | 'order'>) => {
        try {
            const response = await axios.post(`${API_URL}/customers`, customerData);
            const newUser = response.data;
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            console.error("Registration failed", error);
            return null;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}; 