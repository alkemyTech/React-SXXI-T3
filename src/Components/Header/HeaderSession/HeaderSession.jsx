import { useLocation, useNavigate } from "react-router-dom";

import { defaultImage } from "../../../utils/defaultImage";

import "./HeaderSession.css";
import Button from "../../Button/Button";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../../features/auth/authSlice";
import {useOutsideClick} from "../../../hooks/useOutsideClick";
import {useRef} from "react";

const HeaderSession = ({ showInfo, handleShowInfo, switchTheme, theme, hideShowInfo }) => {
  const {user} = useSelector(selectAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const isAdmin = user.role_id === 1;
  const isBackoffice = location.pathname.includes("backoffice");
  const linkTo = isBackoffice ? "/" : "/backoffice";
  const ref = useRef(null);
  useOutsideClick(ref, hideShowInfo);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleRedirect = () => {
    navigate(linkTo);
  };

  return (
    <div className={`hs-dropdown ${showInfo ? "active" : ''}`}  ref={ref}>
      <button className="hs-dropdown-container" onClick={handleShowInfo}>
        <img
          alt={user.name}
          src={user.image_profile || defaultImage}
          className="hs-img"
        />
        <div className="hs-text username-head">{user.name || "Usuario"}</div>
        <span className="hs-text" />
      </button>
      {showInfo && (
        <div className="hs-dropdown-content">
          <div className="hs-text username-content">
            {user.name || "Usuario"}
          </div>
          <small className="hs-dropdown-item role">
            Usuario {isAdmin ? "Administrador" : "Regular"}
          </small>
          <hr className="hs-dropdown-item" />
          <div className="hs-dropdown-item">
            <small>Tema {theme === "dark" ? "oscuro " : "claro "}</small>
            <ThemeSwitcher switchTheme={switchTheme} theme={theme} />
          </div>
          {isAdmin && (
            <Button
              label={isBackoffice ? "Home" : "Backoffice"}
              onClick={handleRedirect}
              className="header-button hs-dropdown-item"
              variant="tertiary"
            />
          )}
          <Button
            label="Cerrar sesión"
            onClick={handleLogOut}
            className="header-button hs-dropdown-item"
            variant="primary"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderSession;
