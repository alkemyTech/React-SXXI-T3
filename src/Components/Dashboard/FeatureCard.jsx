import React from "react";
import {useNavigate} from "react-router-dom";
import "./FeatureCard.css";

export const FeatureCard = ({ name, logo, link }) => {
  const navigate = useNavigate();

  return (
    <div className="feature card" onClick={() => navigate(link)}>
      <div className="feature-name">{name}</div>
      <div className="feature-logo">
        <img src={logo} alt={name} />
      </div>
    </div>
  );
};
