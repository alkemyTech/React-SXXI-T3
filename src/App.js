
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Auth/Login';
import BackofficeRoutes from "./Routes/BackofficeRoutes";
import Register from './Components/Auth/Register';
import ActivitiesDetail from "./Components/Activities/ActivitiesDetail";
import NewsDetail from './Components/News/Detail/NewsDetail';
import Donation from './Components/Donations/Donation';
import Thanks from './Components/Donations/Thanks';
import Contact from "./Components/Contact/Contact";
import NewsList from './Components/News/List/NewsList';
import Nosotros from './Components/About/Nosotros';
import ActivitiesList from './Components/Activities/ActivitiesList';
import Home from "./Components/Home";

import './App.css';

function App() {
  return (
      <Routes>
        <Route path="backoffice/*" element={<BackofficeRoutes/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register />}/>
        <Route path="actividades">
          <Route index element={<ActivitiesList/>}/>
          <Route path=":id" element={<ActivitiesDetail />}/>
        </Route>
        <Route path="novedades">
          <Route index element={<NewsList/>}/>
          <Route path=":id" element={<NewsDetail title="Novedad"/>}/>
        </Route>
        <Route path="contacto" element={<Contact/>}/>
        <Route path="nosotros" element={<Nosotros />}/>
        <Route path="donar" element={<Donation/>}/>
        <Route path="gracias" element={<Thanks/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<></>}/>
      </Routes>
  );
}

export default App;

