import React from "react";
import { CheckCircle, Calendar, Award, ShieldCheck } from "lucide-react";

export default function Certificatetemplate({ data }) {
  if (!data) return null;

  const startDateFormatted = data.startDate ? new Date(data.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : data.startDate;
  const endDateFormatted = data.endDate ? new Date(data.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : data.endDate;
  const issueDateFormatted = data.issueDate ? new Date(data.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent";

  return (
    <div className="result-card success-card" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "left" }}>
      <div className="card-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div className="success-icon" style={{ background: "#dcfce7", color: "#16a34a", padding: "12px", borderRadius: "50%" }}>
          <CheckCircle size={36} />
        </div>
        <div>
          <h2 style={{ fontSize: "1.4rem", color: "#0f172a", margin: 0 }}>Certificate Verified Authentic</h2>
          <p style={{ color: "#64748b", margin: "4px 0 0 0", fontSize: "0.9rem" }}>
            This credential is fully verified and registered in the CertiVerify database.
          </p>
        </div>
      </div>

      <div className="card-body" style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span className="label" style={{ color: "#64748b", fontWeight: "500" }}>Certificate ID</span>
          <span className="value" style={{ fontWeight: "700", fontFamily: "monospace", color: "#1e293b" }}>{data.certificateId || data.id}</span>
        </div>

        <div className="divider" style={{ height: "1px", background: "#e2e8f0", margin: "8px 0" }}></div>

        <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span className="label" style={{ color: "#64748b", fontWeight: "500" }}>Student Name</span>
          <span className="value" style={{ fontWeight: "700", color: "#0f172a", fontSize: "1.1rem" }}>{data.studentName}</span>
        </div>

        <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span className="label" style={{ color: "#64748b", fontWeight: "500" }}>Internship Domain</span>
          <span className="value domain-badge" style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 12px", borderRadius: "20px", fontWeight: "600", fontSize: "0.85rem" }}>
            <Award size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} />
            {data.domain}
          </span>
        </div>

        <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span className="label" style={{ color: "#64748b", fontWeight: "500" }}>Internship Duration</span>
          <span className="value" style={{ color: "#334155", fontWeight: "500" }}>
            <Calendar size={14} style={{ marginRight: "6px", verticalAlign: "middle", color: "#64748b" }} />
            {startDateFormatted} – {endDateFormatted}
          </span>
        </div>

        <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
          <span className="label" style={{ color: "#64748b", fontWeight: "500" }}>Date of Issue</span>
          <span className="value" style={{ color: "#334155", fontWeight: "500" }}>{issueDateFormatted}</span>
        </div>
      </div>
    </div>
  );
}
