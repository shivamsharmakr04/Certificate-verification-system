import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

import API from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // Async Login Function
  const login = async (email, password) => {
    try {
      const res = await API.post("/admin/login", { email, password });
      const { token, user: userData } = res.data;

      if (token && userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        return { success: true, role: userData.role || "admin" };
      }
    } catch (err) {
      console.warn("Backend auth call failed, trying fallback check:", err.response?.data?.msg || err.message);
      // Fallback for default mock admin if database is being initialized
      if (email === "admin@certiverify.com" && password === "admin123") {
        const mockAdmin = { name: "Admin User", email, role: "admin" };
        setUser(mockAdmin);
        localStorage.setItem("user", JSON.stringify(mockAdmin));
        localStorage.setItem("token", "mock-admin-token-12345");
        return { success: true, role: "admin" };
      }
      return { success: false, msg: err.response?.data?.msg || "Login failed. Check credentials." };
    }
    return { success: false, msg: "Invalid login response" };
  };

  // Async Register Function
  const register = async (name, email, password, role = "student", extraData = {}) => {
    try {
      const endpoint = role === "admin" ? "/admin/register" : "/certificate/register-student";
      const payload = role === "admin" 
        ? { name, email, password }
        : { name, email, password, ...extraData };

      const res = await API.post(endpoint, payload);
      if (res.data.token && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        return { success: true, role: res.data.user.role || role, user: res.data.user };
      }
      return { success: true, msg: res.data.msg };
    } catch (err) {
      return { success: false, msg: err.response?.data?.msg || "Registration failed." };
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);