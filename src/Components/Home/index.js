import {useEffect, useState} from "react";

import Slider from "../Slides/Slider/Slider";
import NewsList from "./NewsList/NewsList";

import "./Home.css";

import {Spinner} from "../Feedback/Spinner/Spinner";
import {errorAlert} from "../Feedback/AlertService";
import {SkeletonCard} from "../Feedback/SkeletonCard";
import {apiNews, apiOrganization, apiSlide} from "../../Services/apiService";

const Home = () => {
    const [slideList, setSlideList] = useState([]);
    const [welcomeText, setWelcomeText] = useState("");
    const [newsList, setNewsList] = useState([]);
    const [isFetchingS, setIsFetchingS] = useState(true);
    const [isFetchingN, setIsFetchingN] = useState(true);
    const limit = 4;

    useEffect(() => {
        apiSlide.getAll("limit=30")
            .then((response) => {
                setSlideList(response);
                setIsFetchingS(false);
            })
            .catch((error) => {
                errorAlert();
                setIsFetchingS(false);
            });

        apiOrganization.getAll()
            .then((response) => {
                setWelcomeText(response.welcome_text);
            })
            .catch((error) => {
                errorAlert();
            });

        apiNews.getAll(`limit=${limit}`)
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
