import React from "react";

const Pricing = () => {
  return (
    <div id="pricing" className="pricing-section reveal">
      <hr className="section-divider" />
      <h2 className="section-title">Choose Your Plan</h2>
      <div className="pricing-container">
        <div className="pricing-card">
          <h3>Free</h3>
          <p className="price">
            0 EGP<span>/month</span>
          </p>
          <p className="price-note text-muted">Free on sign up</p>
          <ul className="features-list">
            <li>Up to 5 Projects</li>
            <li>Basic Task Management</li>
            <li>Email Support</li>
          </ul>
          <button className="primary-button get-started">Get Started</button>
        </div>
        <div className="pricing-card popular">
          <h3>
            Pro <span className="popular-badge">(Most Popular)</span>
          </h3>
          <p className="price">
            550 EGP<span>/month</span>
          </p>
          <ul className="features-list">
            <li>Unlimited Projects</li>
            <li>Advanced Task Management</li>
            <li>Priority Email Support</li>
            <li>Collaboration Tools</li>
          </ul>
          <button className="primary-button get-started">Get Started</button>
        </div>
        <div className="pricing-card">
          <h3>Team</h3>
          <p className="price">Contact Us</p>
          <ul className="features-list">
            <li>Custom Solutions</li>
            <li>Dedicated Account Manager</li>
            <li>24/7 Support</li>
            <li>Onboarding & Training</li>
          </ul>
          <a href="#contact" className="primary-button get-started">Contact Sales</a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
