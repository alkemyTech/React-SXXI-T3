
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Auth/Login';
import BackofficeRoutes from "./Routes/BackofficeRoutes";
import Register from './Components/Auth/Register';
import Slider from "./Components/Slides/Slider/Slider";
import ActivitiesDetail from "./Components/Activities/Detail/ActivitiesDetail";
import './App.css';
import NewsDetail from './Components/News/Detail/NewsDetail';
import Donation from './Components/Donations/Donation';
import Thanks from './Components/Donations/Thanks';
import Nosotros from './Components/About/Nosotros';


function App() {
  return (
      <Routes>
        <Route path="backoffice/*" element={<BackofficeRoutes/>}/>

        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register />}/>
        <Route path="actividades">
          <Route index element={<></>}/>
          <Route path=":id" element={<ActivitiesDetail/>}/>
        </Route>
        <Route path="novedades">
          <Route index element={<></>}/>
          <Route path=":id" element={<NewsDetail title="Novedad"/>}/>
        </Route>
        <Route path="contacto" element={<></>}/>
        <Route path="nosotros" element={<Nosotros />}/>
        <Route path="donar" element={<Donation/>}/>
        <Route path="gracias" element={<Thanks/>}/>
        <Route path="/" element={<Slider/>}/>
        <Route path="*" element={<></>}/>
      </Routes>
  );
}

export default App;

