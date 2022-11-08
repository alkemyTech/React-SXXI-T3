import React from "react";
import Title from "../../Title/Title";
import { NewsCard } from "../Card/NewsCard";
import "../../CardListStyles.css";
import "./NewsList.css";

const NewsList = () => {
  const newsMock = [];

  return (
    <div className="container">
      <div className="row">
        <Title title="Novedades" />
      </div>
      <ul className="list-container news-container row ">
        {newsMock.length > 0 ? (
          newsMock.map((element) => {
            return (
              <NewsCard
                id={element.id}
                name={element.name}
                content={element.content}
                image={element.image}
              />
            );
          })
        ) : (
          <div className="noNews">
          <p>No hay novedades para mostrar...</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NewsList;
