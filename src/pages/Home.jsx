import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  UploadCloud, 
  ShieldCheck, 
  FileText, 
  CheckCircle,
  Users,
  Award
} from "lucide-react";
import "../assets/Home.css";

// Animation Configuration
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <motion.div 
              className="hero-text"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="badge">
                <ShieldCheck size={16} /> #1 Verification Platform
              </div>
              <h1>
                Secure & Instant <br />
                <span>Internship Verification</span>
              </h1>
              <p>
                Streamline the credential process. Admins can upload bulk data in seconds, 
                and students can verify their certificates with a unique ID instantly.
              </p>
              
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => window.location.href = '/verify'}>
                  <Search size={18} /> Verify Certificate
                </button>
                <button className="btn-secondary" onClick={() => window.location.href = '/login'}>
                  Admin Login <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="trust-row">
                <div className="trust-item">
                  <CheckCircle size={18} className="trust-icon" />
                  <span>100% Authentic</span>
                </div>
                <div className="trust-item">
                  <CheckCircle size={18} className="trust-icon" />
                  <span>Secure Database</span>
                </div>
              </div>
            </motion.div>

            {/* Visual Composition */}
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="float-card card-1">
                <div className="card-icon blue">
                  <FileText size={24} />
                </div>
                <div className="card-info">
                  <h4>Verified</h4>
                  <p>ID: CERT-2024</p>
                </div>
                <CheckCircle size={20} className="status success" />
              </div>

              <div className="float-card card-2">
                <div className="card-icon purple">
                  <UploadCloud size={24} />
                </div>
                <div className="card-info">
                  <h4>Data Upload</h4>
                  <p>Processing...</p>
                </div>
                <div className="spinner small"></div>
              </div>

              <div className="main-illustration">
                <div className="certificate-bg">
                  <Award size={80} className="main-icon" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="bg-blob left"></div>
        <div className="bg-blob right"></div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="stat-box">
              <h2>10k+</h2>
              <p>Certificates Issued</p>
            </div>
            <div className="stat-box">
              <h2>500+</h2>
              <p>Institutions</p>
            </div>
            <div className="stat-box">
              <h2>99.9%</h2>
              <p>Uptime Guarantee</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Everything You Need</h2>
            <p>A powerful solution for both Administrators and Students.</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="feature-box">
              <div className="feature-icon-wrapper blue">
                <Search size={32} />
              </div>
              <h3>Easy Search</h3>
              <p>Students simply enter their Certificate ID to view and download their authentic credentials.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper purple">
                <UploadCloud size={32} />
              </div>
              <h3>Bulk Upload</h3>
              <p>Admins can upload thousands of student records via a single Excel sheet effortlessly.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper orange">
                <ShieldCheck size={32} />
              </div>
              <h3>Tamper-Proof</h3>
              <p>Data integrity checks ensure no certificate details can be altered after issuance.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-banner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Ready to Get Started?</h2>
            <p>Join the platform that secures academic and professional futures.</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => window.location.href = '/register'}>
                Create Account
              </button>
              <button className="btn-outline" onClick={() => window.location.href = '/about'}>
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}