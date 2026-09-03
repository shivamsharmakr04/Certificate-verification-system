import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function StudentRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
