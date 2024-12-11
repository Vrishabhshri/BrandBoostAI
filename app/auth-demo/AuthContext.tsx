'use client';

import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define the shape of the AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    setAuthStatus: (status: boolean) => void;
    authenticate: (email: string, password: string) => Promise<boolean>;
}

// Create the AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthStatus: () => {},
    authenticate: async () => false,
});

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    // Function to update authentication status
    const setAuthStatus = (status: boolean) => {
        setIsAuthenticated(status);
    };

    // Mock authentication function for testing
    const authenticate = async (email: string, password: string): Promise<boolean> => {
        try {
            // For testing, bypass validation and assume login is successful
            setAuthStatus(true);
            router.push('/dashboard');
            return true;
        } catch (error) {
            console.error('Authentication error:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthStatus, authenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
