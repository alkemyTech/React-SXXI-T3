import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { apiONG } from "../../Services/apiONG";
import DetailCard from "../DetailCard/DetailCard";

import Title from "../Title/Title";


const ActivitiesDetail = () => {
    const {id} = useParams();
    const [activity, setActivity] = useState({});

    useEffect(() => {
        apiONG.get('/activities/' + id)
        .then((response) => {
            setActivity(response.data.data);
        });
    }, [id]);

    return (
        <div>
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
        </div>
    );

}

export default ActivitiesDetail;


