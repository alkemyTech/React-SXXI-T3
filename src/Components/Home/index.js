import { useEffect, useState } from "react";

import Slider from "../Slides/Slider/Slider";
import NewsList from "./NewsList/NewsList";
import { getSlides } from "../../Services/slidesServices/slidesService";
import { getOrganizationInfo } from "../../Services/organizationService/organizationService";
import { getNews } from "../../Services/newsService/newsService";

import "./Home.css";
import { Spinner } from "../Feedback/Spinner/Spinner";
import { errorAlert } from '../Feedback/AlertService';

const Home = () => {
  const [slideList, setSlideList] = useState([]);
  const [welcomeText, setWelcomeText] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getSlides()
      .then((response) => {
        setSlideList(response);
      })
      .catch((error) => {
        errorAlert();
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
        setIsFetching(() => false);
      })
      .catch((error) => {
        setIsFetching(() => false);
        errorAlert();
      });
  }, []);

  return (
    <>
      <div className="home">
        <div className="carousel-slider-home">
          <Slider slideList={slideList} />
        </div>
        <p className="welcome-text">{welcomeText}</p>

        {isFetching ? <Spinner /> : <NewsList newsList={newsList} />}
      </div>
    </>
  );
};

export default Home;
