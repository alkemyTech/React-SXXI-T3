import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import DetailCard from "../../DetailCard/DetailCard";
import Title from "../../Title/Title";


const ActivitiesDetail = () => {
    const {id} = useParams();
    const [activity, setActivity] = useState({});

    useEffect(() => {
        setActivity({
            "id": 2074,
            "name": "Volar Barriletes",
            "slug": null,
            "description": "<p>La mayor&iacute;a de los ni&ntilde;os despu&eacute;s de una faena de juegos caen rendidos en sus camas; y pasar un d&iacute;a volando cometas bien puede ser una actividad placentera para tu hijo y para toda la familia.</p>",
            "image": "http://ongapi.alkemy.org/storage/BKxNd6AHEY.jpeg",
            "user_id": 0,
            "category_id": 0,
            "created_at": "2022-09-20T01:06:05.000000Z",
            "updated_at": "2022-10-21T20:18:48.000000Z",
            "deleted_at": null,
            "group_id": null
        })
    }, [id]);

    return (
        <>
            <Title title={activity.name}/>
            <DetailCard
                content={activity.description}
                date={activity.created_at}
                color="primary"
                buttonLabel="Volver a actividades"
                onClick={() => {}}
                imageUrl={activity.image}
                imageAlt={activity.name}
            />
        </>
    );

}

export default ActivitiesDetail;


