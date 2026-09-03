import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, FileText, Image as ImageIcon, FileSpreadsheet, ShieldCheck, AlertCircle } from "lucide-react";
import API from "../../services/api";

export default function MultiFormatUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [message, setMessage] = useState("");
  const [formatType, setFormatType] = useState("excel"); // excel, pdf, image

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUploadStatus("success");
      setMessage(res.data.msg || "Data uploaded & ingested successfully!");
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setUploadStatus("error");
      setMessage(err.response?.data?.msg || "Failed to upload file. Check file format.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{ padding: "32px", maxWidth: "900px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#f8fafc", marginBottom: "8px" }}>
          Multi-Format Student Data Import
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
          Import student certificate records using Excel sheets (.xlsx, .csv), PDF documents, or scanned Certificate Images with automated AI OCR parsing.
        </p>
      </div>

      {/* Format Selector Tabs */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => { setFormatType("excel"); setFile(null); }}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "14px",
            borderRadius: "12px",
            border: formatType === "excel" ? "1px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.1)",
            background: formatType === "excel" ? "rgba(99, 102, 241, 0.2)" : "rgba(15, 23, 42, 0.6)",
            color: formatType === "excel" ? "#818cf8" : "#94a3b8",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.25s ease"
          }}
        >
          <FileSpreadsheet size={20} />
          <span>Excel / CSV Sheet</span>
        </button>

        <button
          type="button"
          onClick={() => { setFormatType("pdf"); setFile(null); }}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "14px",
            borderRadius: "12px",
            border: formatType === "pdf" ? "1px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
            background: formatType === "pdf" ? "rgba(6, 182, 212, 0.2)" : "rgba(15, 23, 42, 0.6)",
            color: formatType === "pdf" ? "#38bdf8" : "#94a3b8",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.25s ease"
          }}
        >
          <FileText size={20} />
          <span>PDF Document</span>
        </button>

        <button
          type="button"
          onClick={() => { setFormatType("image"); setFile(null); }}
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "14px",
            borderRadius: "12px",
            border: formatType === "image" ? "1px solid #34d399" : "1px solid rgba(255, 255, 255, 0.1)",
            background: formatType === "image" ? "rgba(16, 185, 129, 0.2)" : "rgba(15, 23, 42, 0.6)",
            color: formatType === "image" ? "#34d399" : "#94a3b8",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.25s ease"
          }}
        >
          <ImageIcon size={20} />
          <span>Image (AI OCR Scan)</span>
        </button>
      </div>

      {message && (
        <div style={{
          padding: "14px 18px",
          borderRadius: "10px",
          marginBottom: "20px",
          color: uploadStatus === "error" ? "#fb7185" : "#34d399",
          backgroundColor: uploadStatus === "error" ? "rgba(244, 63, 94, 0.15)" : "rgba(16, 185, 129, 0.15)",
          border: uploadStatus === "error" ? "1px solid rgba(244, 63, 94, 0.35)" : "1px solid rgba(16, 185, 129, 0.35)",
          fontWeight: "600",
          fontSize: "0.95rem"
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "2px dashed rgba(99, 102, 241, 0.35)",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {uploadStatus === "uploading" ? (
            <div>
              <div className="spinner" style={{ margin: "0 auto 16px auto" }}></div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "6px" }}>
                Parsing & Ingesting {formatType.toUpperCase()} File...
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Running validation checks & bulk MongoDB write...</p>
            </div>
          ) : uploadStatus === "success" ? (
            <div>
              <CheckCircle size={56} style={{ color: "#34d399", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#f8fafc", marginBottom: "6px" }}>
                Data Uploaded Successfully!
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "20px" }}>
                {file ? file.name : "Uploaded file"} processed and added to active database.
              </p>
              <button 
                type="button"
                onClick={() => { setUploadStatus("idle"); setFile(null); setMessage(""); }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#f8fafc",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Upload Another File
              </button>
            </div>
          ) : (
            <div>
              <UploadCloud size={56} style={{ color: "#818cf8", marginBottom: "16px" }} />
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "6px" }}>
                {file ? file.name : `Drag & Drop ${formatType.toUpperCase()} file here`}
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "20px" }}>
                {file ? `${(file.size / 1024).toFixed(1)} KB` : `Supported extensions: ${formatType === "excel" ? ".xlsx, .xls, .csv" : formatType === "pdf" ? ".pdf" : ".png, .jpg, .jpeg"}`}
              </p>
              
              <label 
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "#ffffff",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "inline-block",
                  boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)"
                }}
              >
                Browse File
                <input 
                  type="file" 
                  accept={formatType === "excel" ? ".xlsx, .xls, .csv" : formatType === "pdf" ? ".pdf" : ".png, .jpg, .jpeg"} 
                  onChange={handleFileChange} 
                  hidden 
                />
              </label>

              {file && (
                <div style={{ marginTop: "20px" }}>
                  <button 
                    type="submit" 
                    style={{
                      padding: "12px 32px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)"
                    }}
                  >
                    Confirm & Ingest File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <a 
          href="data:text/csv;charset=utf-8,Certificate%20ID%2CStudent%20Name%2CInternship%20Domain%2CStart%20Date%2CEnd%20Date%0ACERT-1001%2CAlex%20Morgan%2CFull%20Stack%20Development%2C2023-01-15%2C2023-04-15%0ACERT-1002%2CSarah%20Connor%2CData%20Science%2C2023-02-01%2C2023-05-01" 
          download="Sample_Student_Certificates.csv"
          style={{ textDecoration: "none", color: "#818cf8", fontSize: "0.85rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <FileText size={16} /> Download Sample Template CSV
        </a>
      </div>
    </motion.div>
  );
}
