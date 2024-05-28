import React, { useEffect, useState, createContext, useContext } from 'react';
import { registerRequest, loginRequest, verityTokenRequest } from '../model/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signinAdmin = async (email, contrasenia) => {
        try {
            if (email === 'admin@hotmail.com' && contrasenia === 'admin1234') {
                setIsAuthenticated(true);
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error en el servidor:', error);
        }
    };

    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }
            try {
                const res = await verityTokenRequest(token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    setUser(null);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{ signup, signin, user, isAuthenticated, errors, signinAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
