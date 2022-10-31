import React from 'react';
import {Route, Routes} from 'react-router-dom';

import BackofficeRoutes from "./Routes/BackofficeRoutes";

import './App.css';

function App() {
  return (
      <Routes>
        <Route path="backoffice/*" element={<BackofficeRoutes/>}/>
        <Route path="login" element={<></>}/>
        <Route path="register" element={<></>}/>
        <Route path="actividades">
          <Route index element={<></>}/>
          <Route path=":id" element={<></>}/>
        </Route>
        <Route path="novedades">
          <Route index element={<></>}/>
          <Route path=":id" element={<></>}/>
        </Route>
        <Route path="contacto" element={<></>}/>
        <Route path="nosotros" element={<></>}/>
        <Route path="/" element={<></>}/>
        <Route path="*" element={<></>}/>
      </Routes>
  );
}

export default App;

