import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';

const LoginPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const { closeLoginModal, redirectPath } = useUI();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = await login(email, password);
        if (success) {
            closeLoginModal();
            navigate(redirectPath || '/', { replace: true });
        } else {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const newUser = await register({ name, email, phone, address });
        if (newUser) {
            closeLoginModal();
            navigate(redirectPath || '/', { replace: true });
        } else {
            setError('Registration failed. The email might already be in use.');
        }
    }

    return (
        <div className="p-8 max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {isLoginView ? 'Login' : 'Register'}
            </h1>
            
            {isLoginView ? (
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" className="w-full btn-primary">
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    <input 
                        type="tel" 
                        placeholder="Phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    <input 
                        type="text" 
                        placeholder="Address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="input-field"
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" className="w-full btn-primary">
                        Register
                    </button>
                </form>
            )}
            
            <button 
                onClick={() => setIsLoginView(!isLoginView)} 
                className="mt-6 text-blue-600 hover:text-blue-800 underline text-sm"
            >
                {isLoginView ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
        </div>
    );
};

export default LoginPage;