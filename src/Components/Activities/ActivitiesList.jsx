import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiONG } from '../../Services/apiONG';
import '../CardListStyles.css';
import { ActivityCard } from './ActivityCard';
import Title from '../Title/Title';

const ActivitiesList = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        apiONG.get('/activities')
        .then((response) => {
            setActivities(response.data.data);
        });
    }, []);

    return (
        <div className="container">
          <Title title="Actividades" />
          <ul className="list-container mt-3 row">
              {activities?.map((element) => {
                return (
                  <ActivityCard
                    key={element.id}
                    id={element.id}
                    name={element.name}
                    content={element.description}
                    image={element.image}
                    buttonLabel='Ver actividad'
                    onClick={() => {document.location.href='/actividades/' + element.id}}
                  />
                );
            })}
          </ul>
        </div>
      );
};
 
export default ActivitiesList;