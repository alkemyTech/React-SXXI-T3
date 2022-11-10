import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiONG } from '../../Services/apiONG';
import '../CardListStyles.css';
import Title from '../Title/Title';
import { NewsCard } from './NewsCard';

const ActivitiesList = () => {
    const mock = [
        {id:1, name: 'Actividad 1', description:'Descripcion de la actividad 1, Descripcion de la actividad 1, Descripcion de la actividad 1,Descripcion de la actividad 1Descripcion de la actividad 1Descripcion de la actividad 1Descripcion de la actividad 1Descripcion de la actividad 1', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RiNmH5AIoZwVGvB835DNuAHaE8%26pid%3DApi&f=1&ipt=aef8fd17edcb70c26f62c326f727ad27bff17766c7f8b21d39830f8f3859dc5e&ipo=images'},
        {id:2, name: 'Actividad 2', description:'Descripcion de la actividad 2', image: ''},
        {id:3, name: 'Actividad 3', description:'Descripcion de la actividad 3', image: ''},
        {id:4, name: 'Actividad 4', description:'Descripcion de la actividad 4', image: ''},
        {id:5, name: 'Actividad 5', description:'Descripcion de la actividad 5', image: ''},
        {id:6, name: 'Actividad 6', description:'Descripcion de la actividad 6', image: ''},
        {id:7, name: 'Actividad 7', description:'Descripcion de la actividad 7', image: ''},
    ];

    return (
        <div className="container">
          <Title title="Actividades" />
          <ul className="list-container mt-3 row">
            {mock.length > 0 ? (
              mock.map((element) => {
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