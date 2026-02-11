import React from "react";
import { ShieldCheck } from "lucide-react";
import "../assets/LoadingSpinner.css";

/**
 * @param {string} message - Text to display below the spinner
 * @param {boolean} fullscreen - If true, covers the whole screen with backdrop. If false, centers in container.
 * @param {string} size - 'small' | 'medium' | 'large'
 */
export default function LoadingSpinner({ 
  message = "Verifying Credentials...", 
  fullscreen = true,
  size = "medium"
}) {
  return (
    <div className={`spinner-wrapper ${fullscreen ? 'fullscreen' : 'inline'}`}>
      <div className="spinner-content">
        <div className={`spinner-container size-${size}`}>
          {/* Outer Spinning Ring */}
          <div className="spinner-ring"></div>
          
          {/* Inner Pulsing Icon */}
          <div className="spinner-icon-bg">
            <ShieldCheck size={size === 'small' ? 16 : size === 'medium' ? 24 : 32} />
          </div>
        </div>

        {message && (
          <div className="spinner-text">
            <p>{message}</p>
            <div className="dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}