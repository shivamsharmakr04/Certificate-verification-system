import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, FileText, AlertCircle } from "lucide-react";
import API from "../../services/api";

export default function Excelupload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [message, setMessage] = useState("");

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
      setMessage("Please select an Excel (.xlsx or .xls) file to upload.");
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
      setMessage(res.data.msg || "Data uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setUploadStatus("error");
      setMessage(err.response?.data?.msg || "Failed to upload Excel file. Check file format.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="upload-section"
    >
      <h1>Upload Student Data</h1>
      <p>Upload an Excel (.xlsx or .xls) file containing student details. Ensure columns include Certificate ID, Student Name, Internship Domain, Start Date, and End Date.</p>

      {message && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "16px",
          color: uploadStatus === "error" ? "#ef4444" : "#10b981",
          backgroundColor: uploadStatus === "error" ? "#fef2f2" : "#ecfdf5",
          border: uploadStatus === "error" ? "1px solid #fee2e2" : "1px solid #d1fae5",
          fontWeight: "500"
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div 
          className={`drop-zone ${uploadStatus === "uploading" ? "uploading" : ""} ${uploadStatus === "success" ? "success" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="drop-content">
            {uploadStatus === "uploading" ? (
              <>
                <div className="spinner"></div>
                <h3>Uploading & Processing Excel Sheet...</h3>
                <p>Parsing student records and saving to MongoDB...</p>
              </>
            ) : uploadStatus === "success" ? (
              <>
                <CheckCircle size={64} className="success-icon" />
                <h3>Upload Successful!</h3>
                <p>{file ? file.name : "Excel file"} processed successfully.</p>
                <button 
                  type="button"
                  className="reset-btn" 
                  onClick={() => { setUploadStatus("idle"); setFile(null); setMessage(""); }}
                >
                  Upload Another File
                </button>
              </>
            ) : (
              <>
                <UploadCloud size={64} className="main-icon" />
                <h3>{file ? file.name : "Drag & Drop Excel file here"}</h3>
                <p>{file ? `${(file.size / 1024).toFixed(1)} KB` : "or click browse to select file (.xlsx, .xls)"}</p>
                
                <label className="browse-btn" style={{ cursor: "pointer", display: "inline-block" }}>
                  Select File
                  <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={handleFileChange} 
                    hidden 
                  />
                </label>

                {file && (
                  <div style={{ marginTop: "16px" }}>
                    <button type="submit" className="browse-btn" style={{ background: "#2563eb", color: "#fff" }}>
                      Upload to System
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </form>

      <div className="template-download" style={{ marginTop: "24px" }}>
        <a 
          href="data:text/csv;charset=utf-8,Certificate%20ID%2CStudent%20Name%2CInternship%20Domain%2CStart%20Date%2CEnd%20Date%0ACERT-1001%2CAlex%20Morgan%2CFull%20Stack%20Development%2C2023-01-15%2C2023-04-15%0ACERT-1002%2CSarah%20Connor%2CData%20Science%2C2023-02-01%2C2023-05-01" 
          download="Sample_Student_Certificates.csv"
          className="outline-btn"
          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <FileText size={16} /> Download Sample Template CSV
        </a>
      </div>
    </motion.div>
  );
}
