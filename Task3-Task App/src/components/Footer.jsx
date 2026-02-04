import React from 'react'
import { Mail , Phone , Facebook , Instagram , Linkedin , Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="footer reveal">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-brand">TaskFlow</h3>
          <p className="footer-description">
            Organize your tasks with ease and efficiency. Your productivity partner.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <div className="footer-links">
            <a href="mailto:taskflow@gmail.com" className="footer-link">
              <Mail size={18} />
              <span>taskflow@gmail.com</span>
            </a>
            <a href="tel:+20xxxxxxxxxx" className="footer-link">
              <Phone size={18} />
              <span>+20 xxx xxx xxxx</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
