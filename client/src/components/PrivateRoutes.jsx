import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user, login } = useAuth();

  const authentication = () => {
    login(user);
  };

  return { authentication } ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
