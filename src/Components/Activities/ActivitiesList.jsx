import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import { ListCard } from "../Card/ListCard/ListCard";
import { getActivities } from "../../Services/activitiesService/activitiesService";
import Title from "../Title/Title";

import "../CardListStyles.css";
import SearchInput from "../SearchInput";
import { SkeletonCard } from "../Feedback/SkeletonCard";
import { errorAlert } from "../Feedback/AlertService";

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getActivities()
      .then((response) => {
        setActivities(response);
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim();

    setSearch(() => value);
    if (cleanValue.length >= 3) {
      setIsLoading(true);
      getActivities(cleanValue)
        .then((response) => {
          setActivities(response);
        })
        .catch((error) => {
          errorAlert();
        })
        .finally(() => setIsLoading(false));
    }
  }, 1000);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    getActivities(search)
      .then((response) => {
        setActivities(response);
      })
      .catch((error) => {
        errorAlert();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <Title title="Actividades" />
      <SearchInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={"Buscar por título"}
      />
      <ul className="list-container mt-3 row">
        {isLoading ? (
          <>
            <SkeletonCard variant="primary" />
            <SkeletonCard variant="primary" />
            <SkeletonCard variant="primary" />
            <SkeletonCard variant="primary" />
          </>
        ) : activities?.length > 0 ? (
          activities?.map((element) => {
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
          })
        ) : (
          <div className="container m-5">
            <p className="text-center fs-3">
              No hay actividades para mostrar...
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ActivitiesList;
