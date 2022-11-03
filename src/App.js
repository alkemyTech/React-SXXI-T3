
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './Components/Auth/Login';
import BackofficeRoutes from "./Routes/BackofficeRoutes";
import Register from './Components/Auth/Register';
import ActivitiesDetail from "./Components/Activities/Detail/ActivitiesDetail";
import './App.css';
import NewsDetail from './Components/News/Detail/NewsDetail';

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
        <Route path="nosotros" element={<></>}/>
        <Route path="/" element={<></>}/>
        <Route path="*" element={<></>}/>
      </Routes>
  );
}

export default App;

