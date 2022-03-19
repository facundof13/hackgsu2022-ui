import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  return auth.authed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
