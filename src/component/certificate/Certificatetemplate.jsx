import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Award, ShieldCheck, QrCode, Sparkles } from "lucide-react";

export default function Certificatetemplate({ data }) {
  if (!data) return null;

  const startDateFormatted = data.startDate ? new Date(data.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
  const endDateFormatted = data.endDate ? new Date(data.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
  const issueDateFormatted = data.issueDate ? new Date(data.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel"
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        boxShadow: "0 20px 50px rgba(16, 185, 129, 0.15)"
      }}
    >
      {/* Background Decorative Mesh */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />

      {/* Header Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10b981",
            padding: "12px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#10b981", fontWeight: "700" }}>
                Official Verification
              </span>
              <Sparkles size={14} style={{ color: "#10b981" }} />
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#f8fafc", margin: "2px 0 0 0" }}>
              Authentic Certificate
            </h2>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <span style={{ display: "block", fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>Status</span>
          <span style={{
            background: "rgba(16, 185, 129, 0.2)",
            color: "#34d399",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "700",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "4px"
          }}>
            <CheckCircle2 size={14} /> VERIFIED REAL
          </span>
        </div>
      </div>

      {/* Main Certificate Content Box */}
      <div style={{
        background: "rgba(15, 23, 42, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Certificate Unique ID</span>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: "700", color: "#38bdf8", marginTop: "2px" }}>
              {data.certificateId || data.id}
            </div>
          </div>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            padding: "8px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <QrCode size={40} style={{ color: "#94a3b8" }} />
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "16px 0" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Student Name</span>
            <div style={{ fontSize: "1.25rem", fontWeight: "700", color: "#f8fafc", marginTop: "2px" }}>
              {data.studentName}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Internship Domain</span>
            <div style={{ marginTop: "4px" }}>
              <span style={{
                background: "rgba(99, 102, 241, 0.2)",
                color: "#818cf8",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <Award size={14} />
                {data.domain}
              </span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Internship Period</span>
            <div style={{ fontSize: "0.95rem", color: "#cbd5e1", fontWeight: "500", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} style={{ color: "#64748b" }} />
              {startDateFormatted} – {endDateFormatted}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>Issue Date</span>
            <div style={{ fontSize: "0.95rem", color: "#cbd5e1", fontWeight: "500", marginTop: "4px" }}>
              {issueDateFormatted}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#64748b" }}>
        <span>Issuer: Official CertiVerify System</span>
        <span>Cryptographic Hash: Validated</span>
      </div>
    </motion.div>
  );
}
