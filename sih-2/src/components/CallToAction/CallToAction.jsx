// components/CallToAction.jsx
import React from 'react';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="call-to-action-section">
      <h2>Ready to Explore Jharkhand?</h2>
      <p>Join thousands of travelers discovering authentic experiences and hidden gems through our smart digital platform.</p>
      <div className="cta-buttons">
        <button className="btn primary">Download Mobile App</button>
        <button className="btn secondary">Plan Your Trip</button>
      </div>
    </section>
  );
};

export default CallToAction;