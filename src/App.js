import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import BackofficeRoutes from "./Routes/BackofficeRoutes";
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
import Login  from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import {useLocalStorage} from "./hooks/useLocalStorage";

import "./App.css";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
      "theme",
      defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
  };

  useEffect(() => {
      document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
      <Routes>
        <Route path="backoffice/*" element={<BackofficeRoutes/>}/>
        <Route path="" element={<Header switchTheme={switchTheme} theme={theme} isLogged={isLogged} handleLogged={setIsLogged}/>}>
        <Route path="login" element={<Login/>}/>
            <Route path="registro" element={<Register/>}/>
            <Route path="actividades">
              <Route index element={<ActivitiesList/>}/>
              <Route path=":id" element={<ActivitiesDetail/>}/>
            </Route>
            <Route path="novedades">
              <Route index element={<NewsList/>}/>
              <Route path=":id" element={<NewsDetail title="Novedad"/>}/>
            </Route>
            <Route path="contacto" element={<Contact/>}/>
            <Route path="nosotros" element={<Nosotros/>}/>
            <Route path="donar" element={<Donation/>}/>
            <Route path="gracias" element={<Thanks/>}/>
            <Route path="/" element={<><Home/><Footer/></>}/>
            <Route path="*" element={<><Home/><Footer/></>}/>
        </Route>
      </Routes>
  );
}

export default App;
