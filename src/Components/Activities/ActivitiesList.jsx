import React, { useEffect, useState } from "react";

import { ListCard } from "../Card/ListCard/ListCard";
import { getActivities } from "../../Services/activitiesService/activitiesService";
import Title from "../Title/Title";

import "../CardListStyles.css";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities().then((response) => {
      setActivities(response);
    });
  }, []);

  return (
    <div className="container">
      <Title title="Actividades" />
      <ul className="list-container mt-3 row">
        {activities?.map((element) => {
          return (
            <ListCard
              key={element.id}
              id={element.id}
              name={element.name}
              content={element.description}
              image={element.image}
              buttonLabel="Ver actividad"
              variant="primary"
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ActivitiesList;
