// components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>Jharkhand Tourism</h3>
          <p>Discover the authentic beauty of Jharkhand through our smart digital platform.</p>
        </div>
        <div className="footer-links-group">
          <h4>Destinations</h4>
          <ul>
            <li><a href="#">Netarhat</a></li>
            <li><a href="#">Betla National Park</a></li>
            <li><a href="#">Hundru Falls</a></li>
            <li><a href="#">Deoghar</a></li>
          </ul>
        </div>
        <div className="footer-links-group">
          <h4>Features</h4>
          <ul>
            <li><a href="#">AI Features</a></li>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Local Marketplace</a></li>
            <li><a href="#">Community Support</a></li>
          </ul>
        </div>
        <div className="footer-links-group">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Jharkhand Tourism Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;