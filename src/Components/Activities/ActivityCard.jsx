import React from "react";
import Button from "../Button/Button";
import "./ActivityCard.css";

export const ActivityCard = ({ id, name, content, image, buttonLabel, onClick = () => {} }) => {

  const newsText = { __html : 
    (content?.length <= 200) ? content : `${content?.substring(0, 200)}...`};

  return (
    <div className="news-card">
      <div className="news-image">
        <img src={image} alt={name} />
      </div>
      <div className="news-content">
        <div className="news-text" dangerouslySetInnerHTML={newsText}>
        </div>
        <div className="news-btn-div">
          <Button label={buttonLabel} className="news-btn" onClick={onClick}/>
        </div>
      </div>
    </div>
  );
};
