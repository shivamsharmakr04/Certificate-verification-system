import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UploadCloud,
  Users,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import API from "../services/api";

import Dashboard from "../component/admin/Dashboard";
import MultiFormatUpload from "../component/admin/Excelupload";
import Studenttable from "../component/admin/Studenttable";

import "../assets/AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch certificates from backend
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/certificates");
      setStudents(res.data || []);
    } catch (err) {
      console.warn("Could not fetch live certificates from backend:", err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDeleted = (deletedId) => {
    setStudents((prev) => prev.filter((s) => s.certificateId !== deletedId));
  };

  return (
    <div className="admin-page-container">
      <div className="container" style={{ maxWidth: "1250px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Header Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-header-panel glass-panel"
          style={{
            padding: "24px 32px",
            marginBottom: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              background: "rgba(99, 102, 241, 0.2)",
              color: "#818cf8",
              padding: "12px",
              borderRadius: "14px",
              border: "1px solid rgba(99, 102, 241, 0.3)"
            }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#f8fafc", margin: 0 }}>
                System Control Center
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "4px 0 0 0" }}>
                Logged in as <strong style={{ color: "#38bdf8" }}>{user?.name || "Administrator"}</strong> ({user?.email})
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={fetchCertificates}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#cbd5e1",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <RefreshCw size={16} /> Refresh Data
            </button>
            <button 
              onClick={handleLogout}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                background: "rgba(244, 63, 94, 0.15)",
                border: "1px solid rgba(244, 63, 94, 0.35)",
                color: "#fb7185",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation Switcher */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", overflowX: "auto", paddingBottom: "4px" }}>
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: activeTab === "dashboard" ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.1)",
              background: activeTab === "dashboard" ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "rgba(15, 23, 42, 0.6)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeTab === "dashboard" ? "0 4px 16px rgba(99, 102, 241, 0.4)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            <LayoutDashboard size={18} />
            <span>Overview & Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab("upload")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: activeTab === "upload" ? "1px solid #06b6d4" : "1px solid rgba(255, 255, 255, 0.1)",
              background: activeTab === "upload" ? "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" : "rgba(15, 23, 42, 0.6)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeTab === "upload" ? "0 4px 16px rgba(6, 182, 212, 0.4)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            <UploadCloud size={18} />
            <span>Multi-Format Upload (Excel, PDF, Image)</span>
          </button>

          <button
            onClick={() => setActiveTab("students")}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: activeTab === "students" ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.1)",
              background: activeTab === "students" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "rgba(15, 23, 42, 0.6)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: activeTab === "students" ? "0 4px 16px rgba(16, 185, 129, 0.4)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            <Users size={18} />
            <span>Manage Student Certificates</span>
          </button>
        </div>

        {/* Tab Content View */}
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <Dashboard students={students} />
            </motion.div>
          )}

          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <MultiFormatUpload onUploadSuccess={fetchCertificates} />
            </motion.div>
          )}

          {activeTab === "students" && (
            <motion.div key="students" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <Studenttable students={students} onDeleteSuccess={handleDeleted} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}