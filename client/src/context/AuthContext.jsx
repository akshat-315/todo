// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Creating a context API
const AuthContext = createContext();

//Create the Provider for the context API. The component is then wrapped around its children where the AuthProvider is needed in the main.jsx file
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    //Utilises the local storage to check a user. Can also directly call the API's here which might be a better way to do it
    const checkAuthUser = (userData) => {
        if (userData) {
            const newUser = {
                userId: userData.userId,
                email: userData.email
            };
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            setIsAuthenticated(true);
        } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
    };

    useEffect(() => {
        checkAuthUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, checkAuthUser, isAuthenticated, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
