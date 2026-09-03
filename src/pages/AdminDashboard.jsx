import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UploadCloud,
  Users,
  FileText,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import API from "../services/api";

import Dashboard from "../component/admin/Dashboard";
import Excelupload from "../component/admin/Excelupload";
import Studenttable from "../component/admin/Studenttable";

import "../assets/AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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
      // Fallback mock data if API is unreachable
      setStudents([
        { certificateId: "CERT-001", studentName: "Alice Johnson", domain: "Web Development", status: "Verified", issueDate: new Date() },
        { certificateId: "CERT-002", studentName: "Bob Smith", domain: "Data Science", status: "Verified", issueDate: new Date() },
        { certificateId: "CERT-003", studentName: "Charlie Brown", domain: "Cyber Security", status: "Pending", issueDate: new Date() }
      ]);
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
    <div className="admin-layout">
      {/* --- Sidebar --- */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <FileText size={24} />
            <h2>Admin Panel</h2>
          </div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === "upload" ? "active" : ""}`}
            onClick={() => { setActiveTab("upload"); setSidebarOpen(false); }}
          >
            <UploadCloud size={20} /> Upload Data
          </button>
          <button 
            className={`nav-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => { setActiveTab("students"); setSidebarOpen(false); }}
          >
            <Users size={20} /> Manage Students
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="user-profile">
            <span className="user-name">{user?.name || "Admin User"}</span>
            <div className="avatar">AD</div>
          </div>
        </header>

        {/* Content Views */}
        <div className="content-area">
          {activeTab === "dashboard" && (
            <Dashboard students={students} />
          )}

          {activeTab === "upload" && (
            <Excelupload onUploadSuccess={fetchCertificates} />
          )}

          {activeTab === "students" && (
            <Studenttable students={students} onDeleteSuccess={handleDeleted} />
          )}
        </div>
      </main>
    </div>
  );
}