import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowUp, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  MapPin,
  Send,
  Sparkles,
  Lock,
  CheckCircle2
} from "lucide-react";
import "../assets/Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  // Handle Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            
            {/* Column 1: Brand & About */}
            <div className="footer-col brand-col">
              <div className="footer-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <ShieldCheck size={32} className="logo-icon" />
                <h2>CertiVerify</h2>
              </div>
              <p>
                An AI-powered, tamper-proof platform for issuing and verifying internship credentials with instant PDF generation and fraud detection.
              </p>
              <div className="social-links">
                <a href="#" className="social-btn" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" className="social-btn" aria-label="Github">
                  <Github size={18} />
                </a>
                <a href="#" className="social-btn" aria-label="Linkedin">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3>Quick Navigation</h3>
              <ul>
                <li><span onClick={() => navigate("/")} className="footer-link">Home</span></li>
                <li><span onClick={() => navigate("/about")} className="footer-link">About Us</span></li>
                <li><span onClick={() => navigate("/verify")} className="footer-link">Verify Certificate</span></li>
                <li><span onClick={() => navigate("/contact")} className="footer-link">Contact Support</span></li>
              </ul>
            </div>

            {/* Column 3: Platform Features */}
            <div className="footer-col">
              <h3>Core Platform</h3>
              <ul>
                <li><span onClick={() => navigate("/verify")} className="footer-link">AI OCR Image Scanner</span></li>
                <li><span onClick={() => navigate("/register")} className="footer-link">Student Auto Certificate</span></li>
                <li><span onClick={() => navigate("/login")} className="footer-link">Admin Multi-Upload</span></li>
                <li><span onClick={() => navigate("/admin/dashboard")} className="footer-link">Telemetry Analytics</span></li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Contact */}
            <div className="footer-col newsletter-col">
              <h3>Stay Informed</h3>
              <p>Subscribe for updates on credential security and features.</p>
              
              {subscribed ? (
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <CheckCircle2 size={16} /> Subscribed successfully!
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit" className="send-btn">
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              )}
              
              <div className="contact-info" style={{ marginTop: "16px" }}>
                <div className="contact-item">
                  <Mail size={15} />
                  <span>support@certiverify.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={15} />
                  <span>Silicon Valley, CA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} CertiVerify Inc. All rights reserved.</p>
            <div className="made-by">
              Built with React, Node.js & MongoDB
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="back-to-top" 
          onClick={goToTop}
          aria-label="Back to Top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  );
}