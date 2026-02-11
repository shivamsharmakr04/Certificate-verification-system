import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (Persist login via LocalStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = (email, password) => {
    // --- MOCK BACKEND LOGIC ---
    let userData = null;

    // 1. Admin Credentials
    if (email === "admin@certiverify.com" && password === "admin123") {
      userData = { name: "Admin User", email, role: "admin" };
    } 
    // 2. Normal User/Student Credentials
    else if (email && password) {
      userData = { name: "Student User", email, role: "student" };
    }

    if (userData) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, role: userData.role };
    }
    
    return { success: false };
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);