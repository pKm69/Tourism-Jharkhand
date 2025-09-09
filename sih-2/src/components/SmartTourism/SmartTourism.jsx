// components/SmartTourism.jsx
import React from 'react';
import './SmartTourism.css';
import {Link, useNavigate, useLocation} from "react-router-dom";

const FeatureCard = ({ icon, title, description,to }) => (
  <Link to={to} className="feature-card clickable">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

const SmartTourism = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  return (
    <section className="smart-tourism-section">
      <h2>Smart Tourism Technology</h2>
      <p className="subtitle">Powered by AI, secured by blockchain, and designed for authentic cultural experiences</p>

      <div className="feature-grid">
        <FeatureCard
          icon="✨"
          title="AI-Powered Itinerary Planning"
          description="Personalized travel plans with multilingual chatbot assistance"
          to="/maps"
        />
        <FeatureCard
          icon="🔗"
          title="Blockchain Security"
          description="Secure transactions and verified guide certifications"
          to="/maps"
        />
        <FeatureCard
          icon="👓"
          title="AR/VR Experiences"
          description="Interactive maps and immersive previews of cultural sites"
          to="/maps"
        />
        <FeatureCard
          icon="📍"
          title="Real-Time Location Info"
          description="Live transport updates and geo-location services"
          to="/maps"
        />
        <FeatureCard
          icon="🛍️"
          title="Local Marketplace"
          description="Tribal handicrafts, homestays, and eco-tourism experiences"
          to="/maps"
        />
        <FeatureCard
          icon="📈"
          title="Analytics Dashboard"
          description="Tourism insights and impact monitoring for officials"
          to="/maps"
        />
      </div>
      <button className="btn primary">Explore All Features</button>
    </section>
  );
};

export default SmartTourism;