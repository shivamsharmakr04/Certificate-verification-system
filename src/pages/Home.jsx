import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  UploadCloud, 
  ShieldCheck, 
  FileText, 
  CheckCircle2,
  Users,
  Award,
  Scan,
  Sparkles,
  Zap,
  Lock,
  ChevronRight,
  ShieldAlert,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../assets/Home.css";

// Animation Configurations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Home() {
  const [quickCertId, setQuickCertId] = useState("");
  const navigate = useNavigate();

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (quickCertId.trim()) {
      navigate(`/verify?id=${encodeURIComponent(quickCertId.trim())}`);
    } else {
      navigate("/verify");
    }
  };

  return (
    <div className="home-page" style={{ minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: "60px 20px 80px 20px", position: "relative" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
            
            {/* Left Column: Hero Text */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
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
                marginBottom: "20px"
              }}>
                <Sparkles size={16} /> #1 AI-POWERED CERTIFICATE VERIFICATION PLATFORM
              </div>

              <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#f8fafc", lineHeight: "1.15", marginBottom: "20px" }}>
                Next-Gen Authentic <br />
                <span style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Internship Credential System
                </span>
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "32px" }}>
                Instantly issue, verify, and validate internship certificates using AI OCR image scanning, multi-format bulk imports (Excel, PDF, Images), and tamper-proof database security.
              </p>
              
              {/* Quick Verification Widget */}
              <form 
                onSubmit={handleQuickVerify}
                className="glass-panel"
                style={{
                  padding: "8px",
                  display: "flex",
                  gap: "8px",
                  maxWidth: "520px",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  marginBottom: "28px"
                }}
              >
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                  <input 
                    type="text" 
                    placeholder="Enter Certificate ID (e.g. CERT-1001)"
                    value={quickCertId}
                    onChange={(e) => setQuickCertId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 12px 12px 42px",
                      borderRadius: "10px",
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.95rem",
                      outline: "none"
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                    color: "#ffffff",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>Verify Now</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Trust Pill Indicators */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "0.85rem", color: "#cbd5e1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} style={{ color: "#34d399" }} />
                  <span>AI OCR Real/Fake Detection</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} style={{ color: "#38bdf8" }} />
                  <span>Auto-Generated PDF Stream</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Visual Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: "relative" }}
            >
              <div className="glass-panel" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
                
                {/* Floating Card 1: Authentic Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(16, 185, 129, 0.2)",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backdropFilter: "blur(10px)",
                    zIndex: 2
                  }}
                >
                  <ShieldCheck size={18} style={{ color: "#34d399" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#34d399" }}>VERIFIED AUTHENTIC</span>
                </motion.div>

                {/* Floating Card 2: AI OCR Scanner */}
                <div style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  borderRadius: "16px",
                  padding: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(6, 182, 212, 0.2)", color: "#22d3ee", padding: "10px", borderRadius: "12px" }}>
                      <Scan size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#f8fafc", margin: 0 }}>AI OCR Image Scanner</h4>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Extracting Certificate Details...</span>
                    </div>
                  </div>

                  <div style={{ background: "rgba(30, 41, 59, 0.6)", padding: "12px 16px", borderRadius: "10px", fontSize: "0.85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ color: "#94a3b8" }}>Extracted ID:</span>
                      <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8", fontWeight: "700" }}>CERT-2026-8819</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#94a3b8" }}>Confidence:</span>
                      <span style={{ color: "#34d399", fontWeight: "700" }}>98.4% Match</span>
                    </div>
                  </div>
                </div>

                {/* Role Fast-Track Entry Buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <button 
                    onClick={() => navigate("/register")}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <Award size={20} />
                    <span>Student Registration</span>
                  </button>

                  <button 
                    onClick={() => navigate("/login")}
                    style={{
                      padding: "14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#f8fafc",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <ShieldCheck size={20} style={{ color: "#818cf8" }} />
                    <span>Admin Control Center</span>
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "40px 20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(15, 23, 42, 0.4)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", textAlign: "center" }}
          >
            <div className="glass-panel" style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#818cf8" }}>100%</h2>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "4px" }}>Tamper-Proof Verification</p>
            </div>
            <div className="glass-panel" style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#38bdf8" }}>Instant</h2>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "4px" }}>Auto PDF Generation</p>
            </div>
            <div className="glass-panel" style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#34d399" }}>AI OCR</h2>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "4px" }}>Real vs Fake Scanner</p>
            </div>
            <div className="glass-panel" style={{ padding: "20px" }}>
              <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#fb7185" }}>24/7</h2>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "4px" }}>Telemetry Analytics</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <span style={{ fontSize: "0.85rem", color: "#818cf8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              POWERFUL FEATURES
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#f8fafc", marginTop: "8px" }}>
              Everything You Need for Certificate Lifecycle
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "600px", margin: "8px auto 0 auto" }}>
              Built for students, administrators, and verification agencies.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}
          >
            
            {/* Feature 1 */}
            <div className="glass-panel" style={{ padding: "28px" }}>
              <div style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", padding: "14px", borderRadius: "14px", display: "inline-block", marginBottom: "16px" }}>
                <Scan size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
                AI OCR Image Scanner
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Upload scanned certificate images. The AI engine recognizes text and verifies authenticity against MongoDB records to detect forged certificates.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel" style={{ padding: "28px" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", padding: "14px", borderRadius: "14px", display: "inline-block", marginBottom: "16px" }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
                Automatic Certificate Creation
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Students automatically receive a pre-filled, unique Certificate ID and preview upon registration, accessible directly from their Student Dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel" style={{ padding: "28px" }}>
              <div style={{ background: "rgba(6, 182, 212, 0.15)", color: "#22d3ee", padding: "14px", borderRadius: "14px", display: "inline-block", marginBottom: "16px" }}>
                <UploadCloud size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
                Multi-Format Bulk Uploads
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Admins can import thousands of student records instantly using Excel (.xlsx, .csv), PDF documents, or scanned Image batches.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel" style={{ padding: "28px" }}>
              <div style={{ background: "rgba(244, 63, 94, 0.15)", color: "#fb7185", padding: "14px", borderRadius: "14px", display: "inline-block", marginBottom: "16px" }}>
                <BarChart3 size={28} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#f8fafc", marginBottom: "8px" }}>
                Real-Time Admin Analytics
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.6" }}>
                Track live verification usage metrics, total student records, authentic search ratios, and fraud attempt alerts in the Admin Control Panel.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "60px 20px 80px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="glass-panel" style={{
            padding: "48px 32px",
            textAlign: "center",
            background: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25) 0%, rgba(15, 23, 42, 0.8) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.3)"
          }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#f8fafc", marginBottom: "12px" }}>
              Ready to Issue & Verify Credentials?
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 32px auto" }}>
              Get started today as a student to receive your official certificate or log in as an administrator to manage records.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <button 
                onClick={() => navigate("/register")}
                style={{
                  padding: "14px 32px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>Get Started Now</span>
                <ChevronRight size={18} />
              </button>

              <button 
                onClick={() => navigate("/verify")}
                style={{
                  padding: "14px 32px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#f8fafc",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Search size={18} />
                <span>Verify a Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}