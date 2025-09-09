import React from 'react';
import './Hero.css'; // For HeroSection specific styles
import {useNavigate, useLocation} from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const handleNavigation = (path) => {
      if (location.pathname !== path) {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover the Heart of Jharkhand</h1>
        <p>Experience pristine forest, rich tribal culture, ancient temples, and vibrant festivals – all powered by AI.</p>
        <div className="hero-buttons">
          <button className="btn primary"  onClick={()=> handleNavigation("/destination")}>Start Your Journey</button>
          <button className="btn secondary">Explore Features</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;