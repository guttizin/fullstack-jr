import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface UIContextType {
    isLoginModalOpen: boolean;
    redirectPath: string | null;
    openLoginModal: (path?: string) => void;
    closeLoginModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};

interface UIProviderProps {
    children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [redirectPath, setRedirectPath] = useState<string | null>(null);

    const openLoginModal = useCallback((path: string = '/') => {
        setRedirectPath(path);
        setIsLoginModalOpen(true);
    }, []);

    const closeLoginModal = useCallback(() => {
        setIsLoginModalOpen(false);
        setRedirectPath(null);
    }, []);

    return (
        <UIContext.Provider value={{ isLoginModalOpen, openLoginModal, closeLoginModal, redirectPath }}>
            {children}
        </UIContext.Provider>
    );
}; 