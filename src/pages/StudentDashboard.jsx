import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Copy, Check, Sparkles, RefreshCw, User, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import API from "../services/api";
import Certificatetemplate from "../component/certificate/Certificatetemplate";
import Downloadbutton from "../component/certificate/Downloadbutton";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchStudentCertificate = async () => {
    try {
      setLoading(true);
      const res = await API.get("/certificate/student/me");
      setCertificate(res.data);
    } catch (err) {
      console.warn("Could not fetch personal certificate:", err.message);
      // Fallback preview using user's auto-generated certificateId or default
      if (user) {
        setCertificate({
          certificateId: user.certificateId || "CERT-2026-9901",
          studentName: user.name || "Student User",
          domain: "Full Stack Web Development",
          startDate: "2026-01-15",
          endDate: "2026-04-15",
          issueDate: new Date()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentCertificate();
  }, []);

  const handleCopyId = () => {
    if (certificate?.certificateId) {
      navigator.clipboard.writeText(certificate.certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="student-page" style={{ minHeight: "90vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
          style={{ padding: "32px", marginBottom: "32px", position: "relative", overflow: "hidden" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#10b981",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "700",
                marginBottom: "12px"
              }}>
                <Sparkles size={14} /> OFFICIAL STUDENT PORTAL
              </div>

              <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#f8fafc", margin: 0 }}>
                Welcome back, {user?.name || "Student"}!
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "4px" }}>
                Your internship certificate was automatically generated upon registration.
              </p>
            </div>

            {certificate && (
              <div style={{
                background: "rgba(15, 23, 42, 0.8)",
                padding: "16px 20px",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "right"
              }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" }}>
                  Your Unique Certificate ID
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.15rem", fontWeight: "700", color: "#38bdf8" }}>
                    {certificate.certificateId}
                  </span>
                  <button
                    onClick={handleCopyId}
                    style={{
                      background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.1)",
                      border: "none",
                      color: copied ? "#34d399" : "#cbd5e1",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}
                  >
                    {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Certificate Display Area */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div className="spinner" style={{ margin: "0 auto 16px auto" }}></div>
            <p style={{ color: "#94a3b8" }}>Loading your official certificate preview...</p>
          </div>
        ) : certificate ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Certificatetemplate data={certificate} />

            <div style={{ textAlign: "center", marginTop: "28px" }}>
              <Downloadbutton certificateId={certificate.certificateId} />
            </div>
          </motion.div>
        ) : (
          <div className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#94a3b8" }}>No active certificate found for your account.</p>
          </div>
        )}

      </div>
    </div>
  );
}
