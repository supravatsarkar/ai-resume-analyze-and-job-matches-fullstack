import React from "react";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }) {
  const isAuthenticated = true;
  if (isAuthenticated) return children;
  setTimeout(() => {
    <Navigate to="/login" />;
  }, 1000);
}
