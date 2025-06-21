import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => {
        if (user) {
            setCustomer({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return;
        }
        if (!user) {
            setError('You must be logged in to place an order.');
            return;
        }

        const order = {
            customerId: user.id,
            items: cartItems.map(item => ({
                productId: item.id,
                productName: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };

        setIsPlacingOrder(true);
        setError('');

        try {
            await axios.post(`${API_URL}/orders`, order);
            alert('Order placed successfully!');
            clearCart();
            navigate('/');
        } catch (err) {
            console.error('Failed to place order:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-32">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h3>
                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Full Name" 
                                value={customer.name} 
                                onChange={handleInputChange} 
                                required 
                                className="input-field"
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={customer.email} 
                                onChange={handleInputChange} 
                                required 
                                className="input-field"
                            />
                            <input 
                                type="tel" 
                                name="phone" 
                                placeholder="Phone" 
                                value={customer.phone} 
                                onChange={handleInputChange} 
                                required 
                                className="input-field"
                            />
                            <input 
                                type="text" 
                                name="address" 
                                placeholder="Shipping Address" 
                                value={customer.address} 
                                onChange={handleInputChange} 
                                required 
                                className="input-field"
                            />
                            
                            <button 
                                type="submit" 
                                disabled={isPlacingOrder || cartItems.length === 0}
                                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                    isPlacingOrder || cartItems.length === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'btn-primary'
                                }`}
                            >
                                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                            </button>
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={`${item.provider}-${item.id}`} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <div>
                                        <span className="font-medium text-gray-900">{item.name}</span>
                                        <span className="text-gray-500 ml-2">x {item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-gray-300 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">Total</span>
                                    <span className="text-xl font-bold text-gray-900">${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage; 