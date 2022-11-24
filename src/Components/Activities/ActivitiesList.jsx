import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { ListCard } from "../Card/ListCard/ListCard";
import { getActivities } from "../../Services/activitiesService/activitiesService";
import Title from '../Title/Title';

import '../CardListStyles.css';
import SearchInput from '../SearchInput';

const ActivitiesList = () => {

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getActivities()
      .then((response) => {
        setActivities(response);
      });
  }, []);

  const handleChange = debounce((event) => {
    const { value } = event.target;
    const cleanValue = value.trim()
    setSearch(() => (value))
    if (cleanValue.length >= 3) {
      getActivities(cleanValue)
        .then(response => {
          setActivities(response)
        })
    }
  }, 1000)

  const handleSubmit = (event) => {
    event.preventDefault();
    getActivities(search)
      .then(response => {
        setActivities(response)
      })
  }

  return (
    <div className="container">
      <Title title="Actividades" />
      <SearchInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder={'Buscar por título'}
      />
      <ul className="list-container mt-3 row">
        {activities?.map((element) => {
          return (
            <ListCard
              key={element.id}
              id={element.id}
              name={element.name}
              content={element.description}
              image={element.image}
              buttonLabel='Ver actividad'
              variant='primary'
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ActivitiesList;