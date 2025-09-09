// components/StatsSection.jsx
import React from 'react';
import './StatsSection.css';

const StatCard = ({ count, description }) => (
  <div className="stat-card">
    <div className="stat-icon">📈</div> {/* Replace with appropriate icons */}
    <h3>{count}</h3>
    <p>{description}</p>
  </div>
);

const StatsSection = () => {
  return (
    <section className="stats-section">
      <StatCard count="500+" description="Local guides and service providers" />
      <StatCard count="200+" description="Artisan products and experiences" />
      <StatCard count="50+" description="Eco-tourism initiatives supported" />
    </section>
  );
};

export default StatsSection;