import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ArrowUp, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  MapPin,
  Phone,
  Send
} from "lucide-react";
import "../assets/Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Handle Back to Top visibility
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            
            {/* Column 1: Brand & About */}
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <ShieldCheck size={32} className="logo-icon" />
                <h2>CertiVerify</h2>
              </div>
              <p>
                A secure and reliable platform for issuing and verifying internship certificates. 
                Bridging the gap between education and industry recognition.
              </p>
              <div className="social-links">
                <a href="#" className="social-btn" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-btn" aria-label="Github">
                  <Github size={20} />
                </a>
                <a href="#" className="social-btn" aria-label="Linkedin">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/verify">Verify Certificate</a></li>
                <li><a href="/contact">Contact Support</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="footer-col">
              <h3>Legal & Support</h3>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Contact */}
            <div className="footer-col newsletter-col">
              <h3>Stay Updated</h3>
              <p>Subscribe to get the latest updates and features.</p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <div className="input-group">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="send-btn">
                    <Send size={18} />
                  </button>
                </div>
              </form>
              
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>support@certiverify.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>Silicon Valley, CA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} CertiVerify. All rights reserved.</p>
            <div className="made-by">
              Built by Shivam
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button className="back-to-top" onClick={goToTop}>
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}