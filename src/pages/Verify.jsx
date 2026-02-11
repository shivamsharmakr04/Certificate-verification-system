import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, Download, Calendar, Award, FileText } from "lucide-react";
import "../assets/verify.css"

export default function Verify() {
  const [certificateId, setCertificateId] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [data, setData] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setStatus("loading");

    // SIMULATE API CALL
    setTimeout(() => {
      if (certificateId.toLowerCase() === "error") {
        setStatus("error");
        setData(null);
      } else {
        // Mock Success Data
        setData({
          id: certificateId,
          studentName: "Alex Johnson",
          domain: "Full Stack Development",
          startDate: "Jan 15, 2023",
          endDate: "Apr 15, 2023",
          issuedDate: "Apr 20, 2023"
        });
        setStatus("success");
      }
    }, 2000); // 2 second delay
  };

  const handleDownload = () => {
    alert("Downloading Certificate PDF...");
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-section"
        >
          <h1>Verify Your Certificate</h1>
          <p>Enter the unique Certificate ID provided by your institution to validate your credentials instantly.</p>
        </motion.div>

        {/* Search Input */}
        <motion.form
          className="search-box"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleVerify}
        >
          <div className="input-group">
            <FileText className="input-icon" size={20} />
            <input
              type="text"
              placeholder="e.g., CERT-2023-X7Y9"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="search-btn" disabled={status === "loading"}>
              {status === "loading" ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <span>Verify</span>
                  <Search size={18} />
                </>
              )}
            </button>
          </div>
          <p className="hint">Tip: Try "CERT-1234" to test valid, or "error" to test invalid.</p>
        </motion.form>

        {/* Result Area */}
        <div className="result-area">
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="result-card error-card"
              >
                <div className="icon-wrapper error-icon">
                  <XCircle size={48} />
                </div>
                <h2>Certificate Not Found</h2>
                <p>We couldn't find a certificate matching ID <strong>"{certificateId}"</strong>. Please check the ID and try again.</p>
              </motion.div>
            )}

            {status === "success" && data && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="result-card success-card"
              >
                <div className="card-header">
                  <div className="success-icon">
                    <CheckCircle size={40} />
                  </div>
                  <div>
                    <h2>Verified Successfully</h2>
                    <p>This certificate is authentic and issued by CertiVerify.</p>
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <span className="label">Certificate ID</span>
                    <span className="value">{data.id}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="info-row">
                    <span className="label">Student Name</span>
                    <span className="value">{data.studentName}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Internship Domain</span>
                    <span className="value domain-badge">{data.domain}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Duration</span>
                    <span className="value">
                      <Calendar size={14} style={{marginRight: '4px'}} />
                      {data.startDate} - {data.endDate}
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button onClick={handleDownload} className="download-btn">
                    <Download size={18} />
                    Download Certificate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}