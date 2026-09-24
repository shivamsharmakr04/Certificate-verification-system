import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle2, ShieldAlert, Scan, Search, Activity, RefreshCw } from "lucide-react";
import API from "../../services/api";

export default function Dashboard({ students = [] }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.warn("Analytics fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [students]);

  const totalCertificates = analytics?.totalCertificates ?? students.length;
  const totalVerifications = analytics?.totalVerifications ?? 0;
  const authenticCount = analytics?.authenticCount ?? 0;
  const tamperedCount = analytics?.tamperedCount ?? 0;
  const ocrScanCount = analytics?.ocrScanCount ?? 0;
  const recentLogs = analytics?.recentLogs ?? [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a" }}>Real-Time System Overview</h1>
          <p style={{ color: "#475569", fontSize: "0.95rem" }}>Live metrics tracking application usage, AI image verifications, and fraud detection analytics.</p>
        </div>

        <button 
          onClick={fetchAnalytics}
          className="outline-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#0f172a",
            padding: "8px 16px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          <RefreshCw size={16} className={loading ? "spinner" : ""} /> Refresh Stats
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {/* KPI 1: Total Certificates */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Total Certificates</span>
            <div style={{ background: "#eff6ff", color: "#2563eb", padding: "10px", borderRadius: "12px" }}>
              <Users size={22} />
            </div>
          </div>
          <h3 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", margin: "12px 0 4px 0" }}>
            {totalCertificates}
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: "600" }}>Active Records in DB</span>
        </div>

        {/* KPI 2: Total Verification Attempts */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Total Verifications</span>
            <div style={{ background: "#f0f9ff", color: "#0284c7", padding: "10px", borderRadius: "12px" }}>
              <Activity size={22} />
            </div>
          </div>
          <h3 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", margin: "12px 0 4px 0" }}>
            {totalVerifications}
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>Total User Searches & Scans</span>
        </div>

        {/* KPI 3: Authentic Verified */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Authentic Certificates</span>
            <div style={{ background: "#ecfdf5", color: "#10b981", padding: "10px", borderRadius: "12px" }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <h3 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#10b981", margin: "12px 0 4px 0" }}>
            {authenticCount}
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: "600" }}>Verified Real Records</span>
        </div>

        {/* KPI 4: Tampered / Fraud Alerts */}
        <div className="glass-panel" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Tampered Alerts</span>
            <div style={{ background: "#fff1f2", color: "#f43f5e", padding: "10px", borderRadius: "12px" }}>
              <ShieldAlert size={22} />
            </div>
          </div>
          <h3 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#e11d48", margin: "12px 0 4px 0" }}>
            {tamperedCount}
          </h3>
          <span style={{ fontSize: "0.8rem", color: "#be123c", fontWeight: "600" }}>Forged Attempts Blocked</span>
        </div>
      </div>

      {/* Audit Telemetry Stream */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a" }}>Real-Time Verification Audit Stream</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Live feed of certificate lookups and AI OCR image verification scans.</p>
          </div>
          <span style={{ fontSize: "0.8rem", color: "#10b981", display: "flex", alignItems: "center", gap: "6px", fontWeight: "700" }}>
            <span className="live-dot" /> Live Telemetry
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {recentLogs.length > 0 ? (
            recentLogs.map((log) => (
              <div 
                key={log._id}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    padding: "8px",
                    borderRadius: "10px",
                    background: log.verificationMethod === "ocr_image" ? "#e0f2fe" : "#eff6ff",
                    color: log.verificationMethod === "ocr_image" ? "#0284c7" : "#2563eb"
                  }}>
                    {log.verificationMethod === "ocr_image" ? <Scan size={18} /> : <Search size={18} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", color: "#0f172a", margin: 0 }}>
                      Certificate ID: {log.certificateId}
                    </h4>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Method: {log.verificationMethod === "ocr_image" ? "AI OCR Image Scan" : "Certificate ID Search"} • {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    background: log.result === "authentic" ? "#d1fae5" : log.result === "tampered" ? "#ffe4e6" : "#f1f5f9",
                    color: log.result === "authentic" ? "#059669" : log.result === "tampered" ? "#e11d48" : "#64748b",
                    border: log.result === "authentic" ? "1px solid #a7f3d0" : log.result === "tampered" ? "1px solid #fecdd3" : "1px solid #e2e8f0"
                  }}>
                    {log.result.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#64748b", padding: "16px 0", textAlign: "center" }}>
              No verification attempts recorded yet. Use the Student Verification portal to search or upload a certificate image.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
