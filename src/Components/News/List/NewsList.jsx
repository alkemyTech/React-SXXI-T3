import { useEffect, useState } from "react";

import Title from "../../Title/Title";
import { ListCard } from "../../Card/ListCard/ListCard";
import { getNews } from "../../../Services/newsService/newsService";

import "../../CardListStyles.css";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews().then((response) => {
      setNews(response);
    });
  }, []);
  return (
    <div className="container">
      <div className="row">
        <Title title="Novedades" />
      </div>
      <div className="list-container mt-3 row ">
        {news.length > 0 ? (
          news.map((element) => {
            return (
              <ListCard
                variant="tertiary"
                id={element.id}
                name={element.name}
                content={element.content}
                image={element.image}
                buttonLabel="Ver novedad"
                key={element.id}
              />
            );
          })
        ) : (
          <div className="container m-5">
            <p className="text-center fs-3">No hay novedades para mostrar...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
