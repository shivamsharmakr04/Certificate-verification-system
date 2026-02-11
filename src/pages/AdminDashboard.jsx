import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  UploadCloud,
  Users,
  FileText,
  LogOut,
  Menu,
  X,
  Search,
  Trash2,
  MoreVertical,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../assets/AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([
    { id: "CERT-001", name: "Alice Johnson", domain: "Web Dev", status: "Verified", date: "2023-10-01" },
    { id: "CERT-002", name: "Bob Smith", domain: "Data Science", status: "Verified", date: "2023-10-02" },
    { id: "CERT-003", name: "Charlie Brown", domain: "Cyber Security", status: "Pending", date: "2023-10-05" },
    { id: "CERT-004", name: "Diana Prince", domain: "AI/ML", status: "Verified", date: "2023-10-06" },
    { id: "CERT-005", name: "Evan Wright", domain: "Cloud Computing", status: "Verified", date: "2023-10-08" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success
  const navigate = useNavigate();

  // Handle Search
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle File Upload Simulation
  const handleFileUpload = (e) => {
    e.preventDefault();
    setUploadStatus("uploading");
    
    // Simulate API Call
    setTimeout(() => {
      setUploadStatus("success");
      // Add dummy data
      setStudents(prev => [...prev, {
        id: `CERT-${Math.floor(Math.random() * 1000)}`,
        name: "New Student (Excel)",
        domain: "Internship",
        status: "Verified",
        date: new Date().toISOString().split('T')[0]
      }]);
      
      setTimeout(() => setUploadStatus("idle"), 3000);
    }, 2000);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleLogout = () => {
    navigate("/login");
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
            <span className="user-name">Admin User</span>
            <div className="avatar">AD</div>
          </div>
        </header>

        {/* Content Views */}
        <div className="content-area">
          
          {/* VIEW 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <h1>Dashboard Overview</h1>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon blue"><Users size={24} /></div>
                  <div className="stat-info">
                    <h3>{students.length}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon purple"><FileText size={24} /></div>
                  <div className="stat-info">
                    <h3>{students.filter(s => s.status === "Verified").length}</h3>
                    <p>Issued Certificates</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orange"><AlertCircle size={24} /></div>
                  <div className="stat-info">
                    <h3>{students.filter(s => s.status === "Pending").length}</h3>
                    <p>Pending Reviews</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {students.slice(0, 3).map((s) => (
                    <div key={s.id} className="activity-item">
                      <div className="act-icon"><CheckCircle size={18} /></div>
                      <div className="act-details">
                        <h4>Certificate Issued: {s.name}</h4>
                        <p>{s.domain} • {s.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW 2: UPLOAD */}
          {activeTab === "upload" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="upload-section"
            >
              <h1>Upload Student Data</h1>
              <p>Upload an Excel (.xlsx) or CSV file containing student details. Ensure columns include Name, ID, Domain, Start Date, End Date.</p>
              
              <div 
                className={`drop-zone ${uploadStatus === "uploading" ? "uploading" : ""} ${uploadStatus === "success" ? "success" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              >
                <div className="drop-content">
                  {uploadStatus === "idle" ? (
                    <>
                      <UploadCloud size={64} className="main-icon" />
                      <h3>Drag & Drop file here</h3>
                      <p>or click to browse</p>
                      <button className="browse-btn">Select File</button>
                      <input type="file" hidden />
                    </>
                  ) : uploadStatus === "uploading" ? (
                    <>
                      <div className="spinner"></div>
                      <h3>Uploading & Processing...</h3>
                      <p>Please wait while we parse the Excel file.</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={64} className="success-icon" />
                      <h3>Upload Successful!</h3>
                      <p>{students.length} records updated.</p>
                      <button className="reset-btn" onClick={() => setUploadStatus("idle")}>Upload Another</button>
                    </>
                  )}
                </div>
              </div>

              <div className="template-download">
                <button className="outline-btn">
                  <FileText size={16} /> Download Excel Template
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW 3: MANAGE STUDENTS */}
          {activeTab === "students" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="table-header">
                <h1>Student Records</h1>
                <div className="search-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search by name or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Certificate ID</th>
                      <th>Student Name</th>
                      <th>Domain</th>
                      <th>Status</th>
                      <th>Issue Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="font-mono">{student.id}</td>
                          <td>
                            <div className="student-cell">
                              <div className="mini-avatar">{student.name.charAt(0)}</div>
                              {student.name}
                            </div>
                          </td>
                          <td>{student.domain}</td>
                          <td>
                            <span className={`badge ${student.status === "Verified" ? "success" : "warning"}`}>
                              {student.status}
                            </span>
                          </td>
                          <td>{student.date}</td>
                          <td>
                            <button className="icon-btn danger" onClick={() => handleDelete(student.id)}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="no-data">No records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}