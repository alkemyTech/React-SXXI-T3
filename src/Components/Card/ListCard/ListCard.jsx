import React from "react";
import { Link } from "react-router-dom";

import Button from "../../Button/Button";
import {useMobile} from "../../../hooks/useIsMobile";

import "./ListCard.css";

export const ListCard = ({
  id,
  name,
  content,
  image,
  buttonLabel,
  variant,
  linkTo,
}) => {
  const isMobile = useMobile();

  const newsText = () => {
    if (isMobile) {
      return {
        __html:
          content?.length <= 90 ? content : `${content?.substring(0, 90)}...`,
      };
    }
    return {
      __html:
        content?.length <= 185 ? content : `${content?.substring(0, 185)}...`,
    };
  };

  return (
    <div className={`list-card ${variant}`}>
      <div className="list-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="list-card-content">
        <div className="list-card-text" dangerouslySetInnerHTML={newsText()} />
        <div className="list-card-btn-div">
          <Link to={linkTo ? linkTo : `${id}`} className="list-card-link">
            <Button
              label={buttonLabel}
              className="list-card-btn"
              variant={variant}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
