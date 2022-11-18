import {useEffect, useState} from "react";

import Slider from "../Slides/Slider/Slider";
import NewsList from "./NewsList/NewsList";
import {getSlides} from "../../Services/slidesServices/slidesService";
import {getOrganizationInfo} from "../../Services/organizationService/organizationService";
import {getNews} from "../../Services/newsService/newsService";

import './Home.css';

const Home = () => {
    const [slideList, setSlideList] = useState([]);
    const [welcomeText, setWelcomeText] = useState('');
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        getSlides().then((response) => {
            setSlideList(response);
        }).catch((error) => {});
        getOrganizationInfo().then((response) => {
            setWelcomeText(response);
        }).catch((error) => {});
        getNews(5).then((response) => {
            setNewsList(response);
        }).catch((error) => {});
    }, []);

    return (
        <>
            <div className="home">
                <div className="carousel-slider-home">
                    <Slider slideList={slideList}/>
                </div>
                <p className="welcome-text">{welcomeText}</p>
                <NewsList newsList={newsList}/>
            </div>
        </>
    )
}

export default Home;

const data = [
    {
        "id": 1411,
        "name": "Juntos somos más",
        "description": "<p>Sé parte de nuestra comunidad y cambiemos el mundo.</p>",
        "image": "http://ongapi.alkemy.org/storage/2sjocle1Nz.png",
        "order": 1,
        "user_id": null,
        "created_at": "2022-08-19T01:24:59.000000Z",
        "updated_at": "2022-08-19T01:24:59.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 1412,
        "name": "Los niños son el futuro.",
        "description": "<p>Acompañemos a nuestros niños a construir un mejor futuro.</p>",
        "image": "http://ongapi.alkemy.org/storage/HjvFnkQSgV.png",
        "order": 2,
        "user_id": null,
        "created_at": "2022-08-19T01:42:20.000000Z",
        "updated_at": "2022-09-15T03:29:35.000000Z",
        "deleted_at": null,
        "group_id": null
    },
    {
        "id": 1413,
        "name": "Exploremos nuevos horizontes",
        "description": "<p>Somos impulsores de nuevas experiencias.&nbsp;</p>",
        "image": "http://ongapi.alkemy.org/storage/AdEulUIBmO.png",
        "order": 3,
        "user_id": null,
        "created_at": "2022-08-19T01:45:51.000000Z",
        "updated_at": "2022-08-19T01:45:51.000000Z",
        "deleted_at": null,
        "group_id": null
    }]
