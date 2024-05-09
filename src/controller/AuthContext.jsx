import { createContext, useState, useContext } from "react";

import { registerRequest, loginRequest } from '../model/auth.js';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            window.alert('El usuario o la contraseña son incorrectos');
        }
    }
    const signinAdmin = async (email, contrasenia) => {
      try {
          if(email === 'admin@hotmail.com' && contrasenia === 'admin1234') {
              setIsAuthenticated(true);
          }else{
            return false;
          }
      } catch (error) {
          console.error('Error en el servidor:', error);
      }
  };
  
    return (
        <AuthContext.Provider
            value={
                { signup, signin, user, isAuthenticated, errors, signinAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}