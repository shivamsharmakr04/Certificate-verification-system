import React from "react";
import { Download } from "lucide-react";

export default function Downloadbutton({ certificateId }) {
  const handleDownload = () => {
    if (!certificateId) return;
    const downloadUrl = `http://localhost:5000/api/certificate/download/${encodeURIComponent(certificateId)}`;
    window.open(downloadUrl, "_blank");
  };

  return (
    <button 
      onClick={handleDownload} 
      className="download-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px 24px",
        borderRadius: "8px",
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "1rem",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
        transition: "all 0.2s ease",
        marginTop: "16px"
      }}
    >
      <Download size={18} />
      Download PDF Certificate
    </button>
  );
}
