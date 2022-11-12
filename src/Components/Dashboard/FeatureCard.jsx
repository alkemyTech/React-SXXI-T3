import React from "react";
import "./FeatureCard.css";
import Button from "../Button/Button";

export const FeatureCard = ({ name, logo, link }) => {
  return (
    <div className="feature-container shadow">
      <div className="feature-name">{name}</div>
      <div className="feature-logo">
        <img src={logo} alt={name} />
      </div>
      <div className="feature-link">
        <Button label="Ir" variant="primary" className="feature-btn" />
      </div>
    </div>
  );
};
