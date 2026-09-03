import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import "../assets/Auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      const res = await register(formData.name, formData.email, formData.password);
      if (res.success) {
        navigate("/admin/dashboard");
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
          <p>Create an account to start issuing or verifying internship certificates securely.</p>
          
          <div className="auth-stats">
            <div className="stat-item">
              <h4>500+</h4>
              <span>Institutions</span>
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
            <p>Fill in the details to get started</p>
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
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up <UserPlus size={18} />
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