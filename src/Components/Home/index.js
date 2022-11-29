import { useEffect, useState } from "react";

import Slider from "../Slides/Slider/Slider";
import NewsList from "./NewsList/NewsList";
import { getSlides } from "../../Services/slidesServices/slidesService";
import { getOrganizationInfo } from "../../Services/organizationService/organizationService";
import { getNews } from "../../Services/newsService/newsService";

import "./Home.css";

const Home = () => {
  const [slideList, setSlideList] = useState([]);
  const [welcomeText, setWelcomeText] = useState("");
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    getSlides()
      .then((response) => {
        setSlideList(response);
      })
      .catch((error) => {});
    getOrganizationInfo()
      .then((response) => {
        setWelcomeText(response.welcome_text);
      })
      .catch((error) => {});
    getNews(null, 4)
      .then((response) => {
        setNewsList(response);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="home">
        <div className="carousel-slider-home">
          <Slider slideList={slideList} />
        </div>
        <p className="welcome-text">{welcomeText}</p>
        <NewsList newsList={newsList} />
      </div>
    </>
  );
};

export default Home;
