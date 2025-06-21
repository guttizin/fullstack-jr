import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                    <Link to="/" className="btn-primary">
                        Go Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-32">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                
                {/* Desktop Table */}
                <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-semibold text-gray-700">Product</th>
                                <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                                <th className="text-left p-4 font-semibold text-gray-700">Quantity</th>
                                <th className="text-left p-4 font-semibold text-gray-700">Total</th>
                                <th className="p-4 font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={`${item.provider}-${item.id}`} className="border-t border-gray-200">
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">${item.price.toFixed(2)}</td>
                                    <td className="p-4">
                                        <input 
                                            type="number" 
                                            value={item.quantity} 
                                            onChange={(e) => updateQuantity(item.id, item.provider, parseInt(e.target.value))}
                                            min="1"
                                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="p-4 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => removeFromCart(item.id, item.provider)}
                                            className="text-red-600 hover:text-red-800 p-2"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {cartItems.map(item => (
                        <div key={`${item.provider}-${item.id}`} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <button 
                                    onClick={() => removeFromCart(item.id, item.provider)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                >
                                    <FaTrash size={16} />
                                </button>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-600">Price:</span>
                                <span className="font-semibold">${item.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-600">Quantity:</span>
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item.id, item.provider, parseInt(e.target.value))}
                                    min="1"
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <h2 className="text-2xl font-bold text-gray-900">Total: ${getCartTotal().toFixed(2)}</h2>
                        <Link to="/checkout" className="btn-primary">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage; 