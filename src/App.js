import React, {useEffect} from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import BackofficeRoutes from "./Routes/BackofficeRoutes";
import ActivitiesDetail from "./Components/Activities/ActivitiesDetail";
import NewsDetail from "./Components/News/Detail/NewsDetail";
import Donation from "./Components/Donations/Donation";
import Thanks from "./Components/Donations/ThanksOverlay";
import Contact from "./Components/Contact/Contact";
import NewsList from "./Components/News/List/NewsList";
import Nosotros from "./Components/About/Nosotros";
import ActivitiesList from "./Components/Activities/ActivitiesList";
import Home from "./Components/Home";
import {Footer} from "./Components/Footer/Footer";
import {Header} from "./Components/Header/HeaderPublic/Header";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import {useLocalStorage} from "./hooks/useLocalStorage";

import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
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
      <Route
          path="backoffice/*"
          element={
            <ProtectedRoute>
              <BackofficeRoutes switchTheme={switchTheme} theme={theme}/>
            </ProtectedRoute>
          }
      />
      <Route
        path=""
        element={
          <>
            <Header
              switchTheme={switchTheme}
              theme={theme}
            />
            <Outlet />
            <Donation />
            <Footer />
          </>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="actividades">
          <Route index element={<ActivitiesList />} />
          <Route path=":id" element={<ActivitiesDetail />} />
        </Route>
        <Route path="novedades">
          <Route index element={<NewsList />} />
          <Route path=":id" element={<NewsDetail title="Novedad" />} />
        </Route>
        <Route path="contacto" element={<Contact />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="donar" element={<Donation />} />
        <Route path="gracias" element={<Thanks />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
