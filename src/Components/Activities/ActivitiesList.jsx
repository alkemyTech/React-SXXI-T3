import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiONG } from '../../Services/apiONG';
import '../CardListStyles.css';
import Title from '../Title/Title';
import { NewsCard } from './NewsCard';

const ActivitiesList = () => {
    const [activities, setActivities] = useState([]);

    //useEffect(() => {
     //   apiONG.get('/activities')
    //    .then((response) => setActivities(response.data.data))
        // .catch((error) => ) SCREEN DE ERROR O REDIRECCIONAR AL HOME 
    //}, []);

    return (
        <div className="container">
          <Title title="Actividades" />
          <ul className="list-container mt-3 row">
            {activities.length > 0 ? (
              activities.map((element) => {
                return (
                  <NewsCard
                    id={element.id}
                    name={element.name}
                    content={element.description}
                    image={element.image}
                  />
                );
              })
            ) : (
              <div className="container m-5">
                <p className="text-center fs-3">No hay actividades para mostrar...</p>
              </div>
            )}
          </ul>
        </div>
      );
};
 
export default ActivitiesList;