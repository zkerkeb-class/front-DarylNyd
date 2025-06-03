'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '@/services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const userData = await AuthService.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await AuthService.login(credentials);
            setUser(response.user);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const response = await AuthService.register(userData);
            setUser(response.user);
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await AuthService.logout();
            setUser(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const forgotPassword = async (email) => {
        try {
            setError(null);
            return await AuthService.forgotPassword(email);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const resetPassword = async (token, newPassword) => {
        try {
            setError(null);
            return await AuthService.resetPassword(token, newPassword);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth; 