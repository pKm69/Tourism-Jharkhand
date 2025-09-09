import React from 'react';
import './Herodestination.css';

const Herosection = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Discover Jharkhand's Hidden Treasures</h1>
        <p>From mystical waterfalls to serene hill stations, diverse landscapes and rich cultural heritage of Jharkhand</p>
        <div className="search-bar">
          <input type="text" placeholder="Search destinations..." />
          <div className="filter-buttons">
            <button className="btn primary">All</button>
            <button className="btn secondary">Hill Station</button>
            <button className="btn secondary">Wildlife</button>
            <button className="btn secondary">Waterfall</button>
            <button className="btn secondary">Spiritual</button>
            <button className="btn secondary">City</button>
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Herosection;