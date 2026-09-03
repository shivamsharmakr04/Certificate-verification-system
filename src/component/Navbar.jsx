import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard,
  Award,
  UserCircle 
} from "lucide-react";
import { useAuth } from "../context/Authcontext";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  // Animation Variants
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 20 },
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <motion.div 
          className="logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
        >
          <ShieldCheck size={32} className="logo-icon" />
          <span>CertiVerify</span>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {/* Feature: Search / Verify */}
          <li>
            <Link to="/verify" className="verify-link">
              <Search size={18} />
              <span>Verify Certificate</span>
            </Link>
          </li>

          {/* Role-Based Links */}
          {user ? (
            <>
              {user.role === 'admin' ? (
                <li>
                  <Link to="/admin/dashboard" className="dashboard-link">
                    <LayoutDashboard size={18} />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/student/dashboard" className="dashboard-link" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.4)" }}>
                    <Award size={18} />
                    <span>My Certificate</span>
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="login-link">Login</Link></li>
              <li><Link to="/register" className="signup-btn">Get Started</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Toggle Button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mobile-menu-content">
              {/* Mobile Header */}
              <div className="mobile-header">
                <div className="user-info">
                  {user ? (
                    <>
                      <UserCircle size={40} />
                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.role === 'admin' ? 'System Administrator' : 'Student Account'}</p>
                      </div>
                    </>
                  ) : (
                    <h3>Welcome to CertiVerify</h3>
                  )}
                </div>
              </div>

              {/* Mobile Links */}
              <div className="mobile-links">
                {[
                  { name: "Home", path: "/", icon: null },
                  { name: "About", path: "/about", icon: null },
                  { name: "Verify Certificate", path: "/verify", icon: <Search size={20}/> },
                  { name: "Contact", path: "/contact", icon: null },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.path} onClick={closeMenu} className="mobile-link-item">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                <div className="mobile-divider" />

                {/* Conditional Mobile Links */}
                {user ? (
                  <>
                    {user.role === 'admin' ? (
                      <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                        <Link to="/admin/dashboard" onClick={closeMenu} className="mobile-link-item">
                          <LayoutDashboard size={20} />
                          <span>Admin Dashboard</span>
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                        <Link to="/student/dashboard" onClick={closeMenu} className="mobile-link-item">
                          <Award size={20} />
                          <span>My Certificate</span>
                        </Link>
                      </motion.div>
                    )}
                    <motion.div variants={itemVariants} transition={{ delay: 0.4 }}>
                      <button onClick={handleLogout} className="mobile-link-item logout">
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                      <Link to="/login" onClick={closeMenu} className="mobile-link-item">
                        <span>Login</span>
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants} transition={{ delay: 0.4 }}>
                      <Link to="/register" onClick={closeMenu} className="mobile-link-item highlight">
                        <span>Get Started</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}