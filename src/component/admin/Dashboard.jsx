import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function Dashboard({ students = [] }) {
  const verifiedCount = students.filter(s => s.status !== "Pending").length;
  const pendingCount = students.filter(s => s.status === "Pending").length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-info">
            <h3>{students.length}</h3>
            <p>Total Student Records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><FileText size={24} /></div>
          <div className="stat-info">
            <h3>{students.length > 0 ? students.length : 0}</h3>
            <p>Issued Certificates</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertCircle size={24} /></div>
          <div className="stat-info">
            <h3>{pendingCount}</h3>
            <p>Pending Reviews</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Uploaded Certificates</h2>
        <div className="activity-list">
          {students.length > 0 ? (
            students.slice(0, 5).map((s) => (
              <div key={s._id || s.certificateId} className="activity-item">
                <div className="act-icon"><CheckCircle size={18} /></div>
                <div className="act-details">
                  <h4>Certificate Issued: {s.studentName} ({s.certificateId})</h4>
                  <p>{s.domain} • Issued: {s.issueDate ? new Date(s.issueDate).toLocaleDateString() : 'Recent'}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#64748b", padding: "12px 0" }}>No certificate records uploaded yet. Go to "Upload Data" tab to upload your student Excel file.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
