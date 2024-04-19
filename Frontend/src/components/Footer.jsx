import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos/logo.png";
import "../styles/FooterStyles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section1 logo-section">
          <Link to="/">
            <img src={logo} alt="AIBetic2 Logo" className="footer-logo" />
          </Link>
        </div>
        <div className="footer-section link-section">
          <Link to="/contact-us">Contact Us</Link>
        </div>
        <div className="footer-section links-section">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </div>
        <div className="footer-section nav-section">
          <Link to="/about-diabetes">About Diabetes</Link>
          <Link to="/health-wellness">Health & Wellness</Link>
          <Link to="/food-nutrition">Food & Nutrition</Link>
          <Link to="/tools-resources">Tools & Resources</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>AIBetic2© All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
