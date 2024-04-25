import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//A ProvateRoute Component which checks if the user is authorized or not by calling the useAuth context. Redirected to sign-in page if not authorized, else redirected to the home page
const PrivateRoutes = () => {
    const { user } = useAuth();

    const isAuthenticated = !!user;

    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
