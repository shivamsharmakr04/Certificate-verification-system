import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Scan, UploadCloud, CheckCircle2, ShieldAlert, AlertTriangle, FileText, Sparkles, RefreshCw, Download } from "lucide-react";
import API from "../services/api";
import Certificatetemplate from "../component/certificate/Certificatetemplate";
import Downloadbutton from "../component/certificate/Downloadbutton";
import "../assets/verify.css";

export default function Verify() {
  const [activeMode, setActiveMode] = useState("id"); // 'id' or 'image'
  const [certificateId, setCertificateId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [status, setStatus] = useState("idle"); // idle, loading, success, tampered, not_found
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Mode 1: Search by Certificate ID
  const handleIdVerify = async (e) => {
    e.preventDefault();
    const queryId = certificateId.trim();
    if (!queryId) return;

    setStatus("loading");
    setErrorMessage("");
    setVerificationResult(null);

    try {
      const res = await API.get(`/certificate/${encodeURIComponent(queryId)}`);
      setVerificationResult({
        verdict: "authentic",
        certificate: res.data
      });
      setStatus("success");
    } catch (err) {
      console.warn("Certificate lookup error:", err.message);
      setStatus("not_found");
      setErrorMessage(err.response?.data?.msg || `No certificate found matching ID "${queryId}". Please check the ID and try again.`);
    }
  };

  // Mode 2: AI OCR Image Certificate Upload Verification (Real vs Fake)
  const handleImageChange = (file) => {
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setStatus("idle");
      setVerificationResult(null);
      setErrorMessage("");
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleOcrVerify = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setStatus("loading");
    setErrorMessage("");
    setVerificationResult(null);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await API.post("/certificate/verify-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setVerificationResult(res.data);
      if (res.data.verdict === "authentic") {
        setStatus("success");
      } else if (res.data.verdict === "tampered") {
        setStatus("tampered");
      } else {
        setStatus("not_found");
        setErrorMessage(res.data.alertReason || "Certificate details could not be matched in database.");
      }
    } catch (err) {
      setStatus("not_found");
      setErrorMessage(err.response?.data?.msg || "AI OCR processing error. Please try another image.");
    }
  };

  return (
    <div className="verify-page" style={{ minHeight: "90vh", padding: "40px 20px" }}>
      <div className="verify-container" style={{ maxWidth: "840px", margin: "0 auto" }}>
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "32px" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            color: "#818cf8",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "700",
            marginBottom: "16px"
          }}>
            <Sparkles size={14} /> AI-POWERED VERIFICATION PORTAL
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#f8fafc", marginBottom: "8px" }}>
            Verify Internship Credentials
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto" }}>
            Validate authentic internship certificates instantly by Certificate ID or by uploading a certificate image for AI fraud detection.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div style={{
          display: "flex",
          justify: "center",
          background: "rgba(15, 23, 42, 0.6)",
          padding: "6px",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "32px"
        }}>
          <button
            onClick={() => { setActiveMode("id"); setStatus("idle"); setVerificationResult(null); }}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: activeMode === "id" ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "transparent",
              color: activeMode === "id" ? "#ffffff" : "#94a3b8",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.3s ease"
            }}
          >
            <Search size={18} /> Search by Certificate ID
          </button>

          <button
            onClick={() => { setActiveMode("image"); setStatus("idle"); setVerificationResult(null); }}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              background: activeMode === "image" ? "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" : "transparent",
              color: activeMode === "image" ? "#ffffff" : "#94a3b8",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.3s ease"
            }}
          >
            <Scan size={18} /> AI Image Scan (Real vs Fake)
          </button>
        </div>

        {/* MODE 1: Certificate ID Search */}
        {activeMode === "id" && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleIdVerify}
            className="glass-panel"
            style={{ padding: "28px", marginBottom: "32px" }}
          >
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#cbd5e1", marginBottom: "8px" }}>
              Enter Certificate ID Number
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <FileText style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} size={20} />
                <input
                  type="text"
                  placeholder="e.g., CERT-1001 or CERT-1234"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    borderRadius: "10px",
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "1.05rem",
                    outline: "none"
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  padding: "14px 28px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  color: "#ffffff",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {status === "loading" ? <div className="spinner" /> : <><span>Verify ID</span><Search size={18} /></>}
              </button>
            </div>
          </motion.form>
        )}

        {/* MODE 2: AI OCR Certificate Image Upload Verification */}
        {activeMode === "image" && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleOcrVerify}
            className="glass-panel"
            style={{ padding: "28px", marginBottom: "32px", textAlign: "center" }}
          >
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
              style={{
                border: "2px dashed rgba(6, 182, 212, 0.4)",
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: "16px",
                padding: "32px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer"
              }}
            >
              {/* Radar Scan Line Animation while scanning */}
              {status === "loading" && <div className="scan-line" />}

              {imagePreview ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img 
                    src={imagePreview} 
                    alt="Certificate Scan" 
                    style={{ maxHeight: "220px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.2)" }} 
                  />
                  <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "#22d3ee", fontWeight: "600" }}>
                    {selectedImage?.name}
                  </div>
                </div>
              ) : (
                <div>
                  <UploadCloud size={54} style={{ color: "#06b6d4", marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f8fafc" }}>
                    Drag & Drop Certificate Image Scan Here
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "4px 0 16px 0" }}>
                    Supports PNG, JPG, or JPEG scanned documents.
                  </p>
                </div>
              )}

              <div style={{ marginTop: "16px" }}>
                <label style={{
                  background: "rgba(6, 182, 212, 0.2)",
                  color: "#22d3ee",
                  border: "1px solid rgba(6, 182, 212, 0.4)",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-block"
                }}>
                  {selectedImage ? "Change Image" : "Browse Image File"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => e.target.files[0] && handleImageChange(e.target.files[0])} 
                    hidden 
                  />
                </label>
              </div>
            </div>

            {selectedImage && (
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  color: "#ffffff",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                {status === "loading" ? (
                  <>
                    <RefreshCw size={18} className="spinner" />
                    <span>AI Engine Scanning & Analyzing Authenticity...</span>
                  </>
                ) : (
                  <>
                    <Scan size={18} />
                    <span>Run AI Fraud Detection & Verification</span>
                  </>
                )}
              </button>
            )}
          </motion.form>
        )}

        {/* VERIFICATION RESULT AREA */}
        <AnimatePresence mode="wait">
          {/* VERDICT 1: AUTHENTIC / REAL */}
          {status === "success" && verificationResult && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Certificatetemplate data={verificationResult.certificate || verificationResult.ocrExtracted} />
              
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Downloadbutton certificateId={verificationResult.certificate?.certificateId || verificationResult.ocrExtracted?.idFound || certificateId} />
              </div>
            </motion.div>
          )}

          {/* VERDICT 2: TAMPERED / FORGED ALERT */}
          {status === "tampered" && verificationResult && (
            <motion.div
              key="tampered"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel"
              style={{
                padding: "32px",
                border: "1px solid rgba(244, 63, 94, 0.4)",
                background: "rgba(244, 63, 94, 0.1)",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{ background: "rgba(244, 63, 94, 0.2)", color: "#fb7185", padding: "12px", borderRadius: "50%" }}>
                  <ShieldAlert size={36} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fb7185", margin: 0 }}>
                    TAMPERED / FORGED CERTIFICATE DETECTED
                  </h2>
                  <p style={{ color: "#fca5a5", margin: "4px 0 0 0", fontSize: "0.95rem" }}>
                    Warning: The uploaded image scan contains mismatched or modified credential data!
                  </p>
                </div>
              </div>

              <div style={{ background: "rgba(15, 23, 42, 0.8)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
                <p style={{ color: "#f8fafc", fontWeight: "600", marginBottom: "12px" }}>
                  {verificationResult.alertReason}
                </p>

                {verificationResult.officialRecord && (
                  <div style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>
                    <div><strong>Official Database Registered Student:</strong> {verificationResult.officialRecord.studentName}</div>
                    <div><strong>Registered Internship Domain:</strong> {verificationResult.officialRecord.domain}</div>
                    <div><strong>Registered Certificate ID:</strong> {verificationResult.officialRecord.certificateId}</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* VERDICT 3: NOT FOUND / UNREGISTERED */}
          {status === "not_found" && (
            <motion.div
              key="not_found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel"
              style={{
                padding: "32px",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                background: "rgba(245, 158, 11, 0.1)",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{ background: "rgba(245, 158, 11, 0.2)", color: "#fbbf24", padding: "12px", borderRadius: "50%" }}>
                  <AlertTriangle size={36} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fbbf24", margin: 0 }}>
                    Certificate Not Registered
                  </h2>
                  <p style={{ color: "#fcd34d", margin: "4px 0 0 0", fontSize: "0.95rem" }}>
                    The searched credential could not be validated in the official database.
                  </p>
                </div>
              </div>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}