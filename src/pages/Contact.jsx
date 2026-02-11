import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  MessageSquare, 
  CheckCircle,
  Github,
  Linkedin
} from "lucide-react";
import "../assets/Contact.css";

// Animation Configuration
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 4000);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div 
          className="page-header"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1>Get in Touch</h1>
          <p>Have questions about CertiVerify? We'd love to hear from you.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left Column: Contact Info */}
          <motion.div 
            className="contact-info"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <h2>Contact Information</h2>
            <p className="subtitle">Fill out the form or reach us directly through the channels below.</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="icon-box blue">
                  <Mail size={24} />
                </div>
                <div className="details">
                  <h4>Email</h4>
                  <p>support@certiverify.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-box purple">
                  <Phone size={24} />
                </div>
                <div className="details">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="info-card">
                <div className="icon-box orange">
                  <MapPin size={24} />
                </div>
                <div className="details">
                  <h4>Office</h4>
                  <p>123 Tech Avenue, Silicon Valley, CA</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-btn"><Github size={20} /></a>
                <a href="#" className="social-btn"><Linkedin size={20} /></a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="form-container"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="form-card">
              {status === "success" ? (
                <div className="success-message">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={64} className="success-icon" />
                  </motion.div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                  <button className="btn-secondary" onClick={() => setStatus("idle")}>
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-header">
                    <MessageSquare size={24} />
                    <h3>Send a Message</h3>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      required 
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea 
                      name="message" 
                      rows="4" 
                      required 
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <div className="spinner small"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}