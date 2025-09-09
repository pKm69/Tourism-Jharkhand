// components/IconicDestinations.jsx
import React from 'react';
import './IconicDestinations.css';
import Netarhat from "../../assets/Netarhat.jpeg"
import Park from "../../assets/download.jpeg"
import Hunduru from "../../assets/Hundru.jpeg"
import {useNavigate, useLocation} from "react-router-dom";

const DestinationCard = ({ image, name, description, rating }) => (
  <div className="destination-card clickable">
    <img src={image} alt={name} />
    <div className="card-info">
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="rating">⭐ {rating}</div>
    </div>
  </div>
);

const IconicDestinations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  return (
    <section className="iconic-destinations-section">
      <h2>Explore Iconic Destinations</h2>
      <p className="subtitle">From mystical waterfalls to sacred temples, discover Jharkhand's hidden gems</p>

      <div className="destination-grid">
        <DestinationCard
          image={Netarhat} // Placeholder image path
          name="Netarhat"
          description="Queen of Chotanagpur - breathtaking sunrise views"
          rating="4.8"
        />
        <DestinationCard
          image={Park}
          name="Betla National Park"
          description="Wildlife sanctuary with tigers and elephants"
          rating="4.6"
        />
        <DestinationCard
          image={Hunduru}
          name="Hundru Falls"
          description="Spectacular 98-meter waterfall cascade"
          rating="4.9"
        />
      </div>
      <button className="btn primary" onClick={()=> handleNavigation("/destination")}>View All Destinations</button>
    </section>
  );
};

export default IconicDestinations;