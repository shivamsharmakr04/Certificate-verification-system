import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext"; // Import Context
import "../assets/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = login(email, password); // Call login from context

      if (result.success) {
        // Redirect based on Role
        if (result.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/"); // Students go to Home
        }
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      {/* Left Side: Decorative */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h2>Welcome Back</h2>
          <p>Access your dashboard, manage certificates, or verify your credentials securely.</p>
          
          <div className="auth-stats">
            <div className="stat-item">
              <h4>10k+</h4>
              <span>Verified</span>
            </div>
            <div className="stat-item">
              <h4>24/7</h4>
              <span>Support</span>
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
            <h1>Login to CertiVerify</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Error Message Display */}
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
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" style={{left: '16px', right: 'auto'}} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  style={{paddingLeft: '45px'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="•••••••" 
                  style={{paddingLeft: '45px'}}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div style={{textAlign: 'right', marginBottom: '20px'}}>
              <a href="#" style={{fontSize: '0.85rem', color: '#64748b', textDecoration: 'none'}}>Forgot Password?</a>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Logging in...
                </>
              ) : (
                <>
                  Login <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="switch-auth">
            Don't have an account? <Link to="/register">Sign up for free</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}