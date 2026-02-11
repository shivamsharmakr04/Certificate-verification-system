import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Upload, 
  Search, 
  FileCheck, 
  ArrowRight,
  CheckCircle 
} from "lucide-react";
import "../assets/About.css";

// Animation configuration for scroll reveal
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="badge">About Us</span>
          <h1>Securing the Future of <br/> <span>Digital Credentials</span></h1>
          <p>
            CertiVerify bridges the gap between institutions and students by providing a 
            tamper-proof, instant verification system for internship certificates. 
            No more paperwork, no more delays.
          </p>
          <div className="hero-btns">
            <button className="primary-btn" onClick={() => window.location.href='/verify'}>
              Try Verification <ArrowRight size={18} />
            </button>
            <button className="secondary-btn" onClick={() => window.location.href='/register'}>
              Join as Admin
            </button>
          </div>
        </motion.div>
        
        {/* Abstract Decorative Elements */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </section>

      {/* Mission / Values Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Why Choose CertiVerify?</h2>
            <p>We combine modern technology with academic integrity.</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="feature-card">
              <div className="icon-box blue">
                <ShieldCheck size={32} />
              </div>
              <h3>Secure & Immutable</h3>
              <p>Our data structure ensures that once a certificate is issued, its details cannot be altered or tampered with.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box purple">
                <Zap size={32} />
              </div>
              <h3>Instant Validation</h3>
              <p>Gone are the days of waiting weeks for postal verification. Get results in seconds with our search engine.</p>
            </div>

            <div className="feature-card">
              <div className="icon-box orange">
                <Globe size={32} />
              </div>
              <h3>Global Accessibility</h3>
              <p>Access your certificates from anywhere in the world. Designed for the modern, remote-ready workforce.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <motion.div 
            className="section-header center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>How It Works</h2>
            <p>A simple 3-step process for institutions and students.</p>
          </motion.div>

          <div className="steps-container">
            {/* Step 1 */}
            <motion.div 
              className="step"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className="step-number">01</div>
              <div className="step-content">
                <Upload className="step-icon" size={40} />
                <h3>Admin Upload</h3>
                <p>Administrators securely upload bulk student data via Excel sheets directly to the dashboard.</p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="step"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="step-number">02</div>
              <div className="step-content">
                <Search className="step-icon" size={40} />
                <h3>Student Search</h3>
                <p>Students visit the verify page and enter the unique ID provided by the institution.</p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="step"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="step-number">03</div>
              <div className="step-content">
                <FileCheck className="step-icon" size={40} />
                <h3>Instant Verify</h3>
                <p>The system validates the ID and instantly displays the verified certificate for download.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack / Trust Banner */}
      <section className="tech-banner">
        <div className="container">
          <motion.div 
            className="banner-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Built on Robust Technology</h2>
            <div className="tech-tags">
              <span className="tag">MongoDB</span>
              <span className="tag">Express.js</span>
              <span className="tag">React.js</span>
              <span className="tag">Node.js</span>
              <span className="tag">Framer Motion</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <CheckCircle size={48} className="cta-icon" />
            <h2>Ready to Verify?</h2>
            <p>Join thousands of students and institutions trusting CertiVerify.</p>
            <button className="cta-btn" onClick={() => window.location.href='/verify'}>
              Get Started Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}