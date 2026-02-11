import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Only allow access if role is 'admin'
  if (user.role !== "admin") {
    return <Navigate to="/" />; // Or a 403 page
  }

  return children;
}