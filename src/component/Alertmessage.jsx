import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import "../assets/AlertMessage.css";

/**
 * Alert Component
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {string} message - The text content of the alert
 * @param {function} onClose - Callback when alert is closed
 * @param {number} duration - Auto-dismiss time in ms (set to 0 to disable)
 */
export default function AlertMessage({ type = "info", message, onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  // Icon mapping
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  useEffect(() => {
    // Entrance animation
    setIsVisible(true);

    // Handle Auto-Dismiss and Progress Bar
    if (duration > 0) {
      const stepTime = 50; // Update every 50ms
      const stepValue = 100 / (duration / stepTime);

      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setProgress((prev) => {
            if (prev <= stepValue) {
              handleClose();
              return 0;
            }
            return prev - stepValue;
          });
        }
      }, stepTime);
    }

    return () => clearInterval(intervalRef.current);
  }, [duration, isPaused]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for exit animation to finish before calling parent onClose
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className={`alert-container alert-${type} ${isVisible ? 'show' : 'hide'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="alert-content">
        <div className="alert-icon">
          {icons[type] || icons.info}
        </div>
        
        <div className="alert-message">
          <p>{message}</p>
        </div>

        <button className="alert-close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      {/* Progress Bar (Only shows if duration > 0) */}
      {duration > 0 && (
        <div 
          className="alert-progress" 
          ref={progressRef}
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </div>
  );
}