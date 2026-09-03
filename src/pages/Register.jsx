import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Award, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import "../assets/Auth.css";

export default function Register() {
  const [accountType, setAccountType] = useState("student"); // 'student' or 'admin'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    domain: "Full Stack Web Development"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await register(
        formData.name,
        formData.email,
        formData.password,
        accountType,
        { domain: formData.domain }
      );

      if (res.success) {
        if (res.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        setError(res.msg || "Registration failed");
      }
    } catch (err) {
      setError("Registration error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side: Decorative */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h2>Join CertiVerify</h2>
          <p>Create a Student account to automatically receive your internship certificate or an Admin account to manage verification records.</p>
          
          <div className="auth-stats">
            <div className="stat-item">
              <h4>Auto</h4>
              <span>Certificate ID</span>
            </div>
            <div className="stat-item">
              <h4>Safe</h4>
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="auth-right">
        <motion.div 
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Select your account role to get started</p>
          </div>

          {/* Account Role Toggle */}
          <div style={{
            display: "flex",
            background: "rgba(15, 23, 42, 0.6)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "20px"
          }}>
            <button
              type="button"
              onClick={() => setAccountType("student")}
              style={{
                flex: 1,
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: accountType === "student" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "transparent",
                color: accountType === "student" ? "#ffffff" : "#94a3b8",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <User size={16} /> Student (Auto Certificate)
            </button>
            <button
              type="button"
              onClick={() => setAccountType("admin")}
              style={{
                flex: 1,
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: accountType === "admin" ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "transparent",
                color: accountType === "admin" ? "#ffffff" : "#94a3b8",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              <ShieldCheck size={16} /> Admin Portal
            </button>
          </div>

          <form onSubmit={handleRegister}>
            {error && (
              <div style={{
                color: '#ef4444',
                backgroundColor: '#fef2f2',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.9rem',
                textAlign: 'center',
                border: '1px solid #fee2e2'
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" style={{left: '16px', right: 'auto', cursor: 'default'}} />
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe" 
                  style={{paddingLeft: '45px'}}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" style={{left: '16px', right: 'auto', cursor: 'default'}} />
                <input 
                  type="email" 
                  name="email"
                  placeholder="name@company.com" 
                  style={{paddingLeft: '45px'}}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {accountType === "student" && (
              <div className="form-group">
                <label>Internship Domain</label>
                <div className="input-wrapper">
                  <Award size={18} className="input-icon" style={{left: '16px', right: 'auto', cursor: 'default'}} />
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 45px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      background: "rgba(15, 23, 42, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      outline: "none"
                    }}
                  >
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                    <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud Computing & DevOps">Cloud Computing & DevOps</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" style={{left: '16px', right: 'auto', cursor: 'default'}} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="••••••••" 
                  style={{paddingLeft: '45px'}}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" style={{left: '16px', right: 'auto', cursor: 'default'}} />
                <input 
                  type="password"
                  name="confirmPassword" 
                  placeholder="••••••••" 
                  style={{paddingLeft: '45px'}}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Generating Account & Certificate...
                </>
              ) : (
                <>
                  {accountType === "student" ? "Register & Generate Certificate" : "Register Admin"} <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>already have an account?</span>
          </div>

          <div className="switch-auth">
            <Link to="/login">Login to your account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}