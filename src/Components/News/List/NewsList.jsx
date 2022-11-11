import React from "react";
import Title from "../../Title/Title";
import { NewsCard } from "../Card/NewsCard";
import "../../CardListStyles.css";

const NewsList = () => {
  const newsMock = [];

  return (
    <div className="container">
      <div className="row">
        <Title title="Novedades" />
      </div>
      <ul className="list-container mt-3 row ">
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
          <div className="container m-5">
          <p className="text-center fs-3">No hay novedades para mostrar...</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default NewsList;
