"use client";

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  // Add User interface definition here
}

interface LoginCredentials {
  // Add LoginCredentials interface definition here
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setAuthStatus: (status: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const setAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  const login = async (credentials: LoginCredentials) => {
    // ... existing login logic
    setAuthStatus(true);
  };

  const logout = () => {
    // ... existing logout logic
    setAuthStatus(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    setAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext; 