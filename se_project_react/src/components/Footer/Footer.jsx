import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © {currentYear} WTWR. All rights reserved.
        </p>
        <div className="footer__links">
          <a href="#" className="footer__link">
            About
          </a>
          <a href="#" className="footer__link">
            Privacy Policy
          </a>
          <a href="#" className="footer__link">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
