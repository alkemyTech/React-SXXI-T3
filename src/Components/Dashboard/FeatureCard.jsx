import React from "react";
import "./FeatureCard.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";


export const FeatureCard = ({ name, logo, link }) => {
  
  const navigate=useNavigate();

  return (
    <div className="feature-container shadow">
      <div className="feature-name">{name}</div>
      <div className="feature-logo">
        <img src={logo} alt={name} />
      </div>
      <div className="feature-link">
        <Button onClick={()=>navigate(link)} label="Ir" variant="primary" className="feature-btn" />
      </div>
    </div>
  );
};
