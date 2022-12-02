import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Title from "../../Title/Title";
import DetailCard from "../../Card/DetailCard/DetailCard";

import "./NewsDetail.css";
import { errorAlert } from "../../Feedback/AlertService";
import { Spinner } from "../../Feedback/Spinner/Spinner";
import { apiNews } from "../../../Services/apiService";

const NewsDetail = ({ title }) => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiNews
      .getSingle(id)
      .then((response) => {
        setNews(response);
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      <Title title={title} />
      {isLoading ? (
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <DetailCard
          content={news.content}
          date={news.created_at}
          color="tertiary"
          buttonLabel="Volver a novedades"
          onClick={() => {
            navigate("/novedades");
          }}
          imageUrl={news.image}
          imageAlt={news.name}
        >
          <h3 className="news-title">{news.name}</h3>
        </DetailCard>
      )}
    </>
  );
};

export default NewsDetail;
