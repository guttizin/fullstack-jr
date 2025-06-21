import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Order } from '../types/order';
import axios from 'axios';
import API_URL from '../config';

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setError("You must be logged in to view orders.");
                setLoading(false);
                return;
            }
            try {
                const params = new URLSearchParams();
                params.append('customerId', user.id);
                const response = await axios.get(`${API_URL}/orders`, { params });
                setOrders(response.data);
            } catch (err) {
                setError("Failed to fetch orders.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
                <div className="text-center">
                    <p className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-32">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                
                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-600 text-lg">You have no orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Order #{order.id}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-2 lg:mt-0">
                                        <p className="text-gray-600">
                                            <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Total:</span> ${parseFloat(order.totalAmount.toString()).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Items:</h4>
                                    <div className="space-y-2">
                                        {order.items.map(item => (
                                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                                <span className="text-gray-700">{item.productName}</span>
                                                <span className="text-gray-600">
                                                    {item.quantity} x ${parseFloat(item.price.toString()).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage; 