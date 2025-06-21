import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../components/Shop';

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string, provider: string) => void;
    updateQuantity: (productId: string, provider: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id && item.provider === product.provider);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id && item.provider === product.provider
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string, provider: string) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.provider === provider)));
    };

    const updateQuantity = (productId: string, provider: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, provider);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId && item.provider === provider ? { ...item, quantity } : item
                )
            );
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}; 