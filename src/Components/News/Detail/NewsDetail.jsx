import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import Title from "../../Title/Title";
import DetailCard from "../../DetailCard/DetailCard";

import './NewsDetail.css';

const NewsDetail = ({title}) => {
    const {id} = useParams();
    const [news, setNews] = useState({});

    useEffect(() => {
        setNews({
            id: 2416,
            name: "Prueba api Novedad",
            slug: null,
            content: "<p>weww</p>",
            image: "http://ongapi.alkemy.org/storage/CUQfMwn7Dr.jpeg",
            user_id: null,
            category_id: 2415,
            created_at: "2022-10-03T17:54:57.000000Z",
            updated_at: "2022-10-03T17:54:57.000000Z",
            deleted_at: null,
            group_id: null
        })
    }, [id]);

    return (
        <>
            <Title title={title}/>
            <DetailCard
                content={news.content}
                date={news.created_at}
                color="tertiary"
                buttonLabel="Volver a novedades"
                onClick={() => { }}
                imageUrl={news.image}
                imageAlt={news.name}
            >
                <h3 className="news-title">{news.name}</h3>
            </DetailCard>
        </>
    );
}

export default NewsDetail;

