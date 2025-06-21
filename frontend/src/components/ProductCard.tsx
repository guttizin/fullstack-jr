import React, { useState } from 'react';
import { FaStar, FaRegHeart, FaShoppingBag } from 'react-icons/fa';
import { BiExpand } from "react-icons/bi";
import type { Product } from './Shop';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [imageSrc, setImageSrc] = useState(product.gallery.length > 0 ? product.gallery[0] : '/placeimg.svg');
    
    const oldPrice = product.hasDiscount ? product.price * 1.5 : null;

    const handleImageError = () => {
        setImageSrc('/placeimg.svg');
    };

    return (
        <div className="card group hover:shadow-lg transition-shadow duration-300">
            <div className="relative overflow-hidden">
                <img 
                    src={imageSrc}
                    alt={product.name}
                    onError={handleImageError}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.hasDiscount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Sale
                    </span>
                )}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                        <FaRegHeart className="text-gray-600" size={14} />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                        <BiExpand className="text-gray-600" size={16} />
                    </button>
                    <button 
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                        <FaShoppingBag className="text-gray-600" size={14} />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
                <h4 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{product.name}</h4>
                <div className="flex items-center space-x-1 mb-3">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="text-sm text-gray-600">5.0</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {oldPrice && (
                        <span className="text-sm text-gray-500 line-through">${oldPrice.toFixed(2)}</span>
                    )}
                </div>
                <button 
                    className="w-full btn-primary"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard; 