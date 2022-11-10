import React from "react";
import Button from "../../Button/Button";
import "./../Card/NewsCard.css";

export const NewsCard = ({ id, name, content, image }) => {
  
  const newsText = { __html :
    content.length <= 200 ? content : `${content.substring(0, 200)}...`};

  return (
    <div className="news-card">
      <div className="news-image">
        <img src={image} alt={name} />
      </div>
      <div className="news-content">
        <div className="news-text" dangerouslySetInnerHTML={newsText}>
        </div>
        <div className="news-btn-div">
          <Button label="Ver novedad" className="news-btn" />
        </div>
      </div>
    </div>
  );
};
