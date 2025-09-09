import React from 'react';
import './Navbar.css';
import {useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={()=> handleNavigation("/")}>
        Jharkhand Tourism
      </div>
      <ul className="navbar-links">
        <li><a onClick={()=> handleNavigation("/destination")}>Destinations</a></li>
        <li><a href="#ai-features">Smart Features</a></li>
        <li><a href="#marketplace">Marketplace</a></li>
        <li><a href="#community">Community</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button className="navbar-button" onClick={()=> handleNavigation("/destination")}>Get Started</button>
    </nav>
  );
};

export default Navbar;