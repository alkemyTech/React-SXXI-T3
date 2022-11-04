import {useEffect, useState} from "react";

import Carousel from "../../Carousel/Carousel";
import SliderTemplate from "./Template/SliderTemplate";

const Slider = () => {
    const [slideList, setSlideList] = useState([]);

    useEffect(() => {
        setSlideList(data);
    }, []);

    return (<Carousel itemList={slideList} itemKey="order" ItemTemplate={SliderTemplate}/>)
}

export default Slider;

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
