import { useEffect, useState } from "react";

import Slider from "../Slides/Slider/Slider";
import NewsList from "./NewsList/NewsList";
import { getSlides } from "../../Services/slidesServices/slidesService";
import { getOrganizationInfo } from "../../Services/organizationService/organizationService";
import { getNews } from "../../Services/newsService/newsService";

import "./Home.css";

import { Spinner } from "../Feedback/Spinner/Spinner";
import { errorAlert } from "../Feedback/AlertService";
import { SkeletonCard } from "../Feedback/SkeletonCard";

const Home = () => {
  const [slideList, setSlideList] = useState([]);
  const [welcomeText, setWelcomeText] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [isFetchingS, setIsFetchingS] = useState(true);
  const [isFetchingN, setIsFetchingN] = useState(true);

  useEffect(() => {
    getSlides()
      .then((response) => {
        setSlideList(response);
        setIsFetchingS(false);
      })
      .catch((error) => {
        errorAlert();
        setIsFetchingS(false);
      });

    getOrganizationInfo()
      .then((response) => {
        setWelcomeText(response.welcome_text);
      })
      .catch((error) => {
        errorAlert();
      });

    getNews(null, 4)
      .then((response) => {
        setNewsList(response);
        setIsFetchingN(false);
      })
      .catch((error) => {
        setIsFetchingN(false);
        errorAlert();
      });
  }, []);

  return (
    <>
      <div className="home">
        <div className="carousel-slider-home">
          {isFetchingS ? <Spinner /> : <Slider slideList={slideList} />}
        </div>
        <p className="welcome-text">{welcomeText}</p>

        {isFetchingN ? (
          <div className="container-fluid d-flex justify-content-evenly">
            <SkeletonCard variant="tertiary" />
            <SkeletonCard variant="tertiary" />
          </div>
        ) : (
          <NewsList newsList={newsList} />
        )}
      </div>
    </>
  );
};

export default Home;
