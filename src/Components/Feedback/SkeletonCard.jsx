import {Skeleton} from "@mui/material";
import React from "react";
import "../Card/ListCard/ListCard.css";

export const SkeletonCard = ({ variant }) => {
  return (
    <div className={`list-card ${variant}`}>
      <div className="list-card-image">
        <Skeleton width={180} height={280} />
      </div>
      <div className="list-card-content">
        <Skeleton width={200} height={180} />

        <div className="list-card-btn-div">
          <Skeleton height={48} width={150} />
        </div>
      </div>
    </div>
  );
};