import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';

const Features = () => {
    return (
        <section className="bg-white py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <FaShippingFast size={32} className="text-green-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h4>
                            <p className="text-gray-600">Free shipping for order above $50</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <FaCreditCard size={32} className="text-green-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Payment</h4>
                            <p className="text-gray-600">Multiple secure payment options</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <FaHeadset size={32} className="text-green-600" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-2">24x7 Support</h4>
                            <p className="text-gray-600">We support online all days</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features; 