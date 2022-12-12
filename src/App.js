import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import BackofficeRoutes from "./Routes/BackofficeRoutes";
import Register from "./Components/Auth/Register";
import ActivitiesDetail from "./Components/Activities/ActivitiesDetail";
import NewsDetail from "./Components/News/Detail/NewsDetail";
import Donation from "./Components/Donations/Donation";
import Thanks from "./Components/Donations/Thanks";
import Contact from "./Components/Contact/Contact";
import NewsList from "./Components/News/List/NewsList";
import Nosotros from "./Components/About/Nosotros";
import ActivitiesList from "./Components/Activities/ActivitiesList";
import Home from "./Components/Home";
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import ProtectedRoute from './Components/ProtectedRoute';

import "./App.css";

function App() {
  console.log(process.env.REACT_APP_ROOT_URL)
  return (
    <Routes>

      <Route
        path="backoffice/*"
        element={
          <ProtectedRoute>
            <BackofficeRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="login" element={<><Header /><Login /></>} />
      <Route path="register" element={<><Header /><Register /></>} />
      <Route path="actividades">
        <Route index element={<><Header /><ActivitiesList /></>} />
        <Route path=":id" element={<><Header /><ActivitiesDetail /></>} />
      </Route>
      <Route path="novedades">
        <Route index element={<><Header /><NewsList /></>} />
        <Route path=":id" element={<><Header /><NewsDetail title="Novedad" /></>} />
      </Route>
      <Route path="contacto" element={<><Header /><Contact /></>} />
      <Route path="nosotros" element={<><Header /><Nosotros /></>} />
      <Route path="donar" element={<><Header /><Donation /></>} />
      <Route path="gracias" element={<><Header /><Thanks /></>} />
      <Route path="/" element={<><Header /><Home /><Footer /></>} />
      <Route path="*" element={<><Header /><Home /><Footer /></>} />
    </Routes>
  );
}

export default App;
