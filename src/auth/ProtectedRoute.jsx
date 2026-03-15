import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userId = localStorage.getItem("userId");

  if (!isLoggedIn || !userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
