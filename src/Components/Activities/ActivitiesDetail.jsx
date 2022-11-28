import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiActivity } from "../../Services/apiService";
import DetailCard from "../Card/DetailCard/DetailCard";

import Title from "../Title/Title";

const ActivitiesDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    apiActivity
    .getSingle(id)
    .then((response) => {
      if(response) setActivity(response);
    });
  }, [id]);

  return (
    <div>
      <Title title={activity.name} />
      <DetailCard
        content={activity.description}
        date={activity.created_at}
        color="primary"
        buttonLabel="Volver a actividades"
        imageUrl={activity.image}
        imageAlt={activity.name}
        onClick={() => {
          document.location.href = "/actividades";
        }}
      />
    </div>
  );
};

export default ActivitiesDetail;
