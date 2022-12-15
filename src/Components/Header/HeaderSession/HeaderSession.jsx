import { useLocation, useNavigate } from "react-router-dom";

import { defaultImage } from "../../../utils/defaultImage";

import "./HeaderSession.css";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../../features/auth/authSlice";

const HeaderSession = ({ showInfo, handleShowInfo }) => {
  const {user} = useSelector(selectAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const isAdmin = user.role_id === 1;
  const isBackoffice = location.pathname.includes("backoffice");
  const linkTo = isBackoffice ? "/" : "/backoffice";

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleRedirect = () => {
    navigate(linkTo);
  };

  return (
    <div className="hs-dropdown">
      <button className="hs-dropdown-container" onClick={handleShowInfo}
              data-testid="dropdownInfoButton">
        <img
          alt={user.name}
          src={user.image_profile || defaultImage}
          className="hs-img"
        />
        <div className="hs-text username-head" data-testid="dropdownName">{user.name || "Usuario"}</div>
        <span className="hs-text" />
      </button>
      {showInfo && (
        <div className="hs-dropdown-content">
          <div className="hs-text username-content" data-testid="dropdownName">
            {user.name || "Usuario"}
          </div>
          <small className="hs-dropdown-item role" data-testid="dropdownRole">
            Usuario {isAdmin ? "Administrador" : "Regular"}
          </small>
          <hr className="hs-dropdown-item" />
          {isAdmin && (
            <Button
              label={isBackoffice ? "Home" : "Backoffice"}
              onClick={handleRedirect}
              className="header-button hs-dropdown-item"
              variant="tertiary"
              data-testid="dropdownAdminButton"
            />
          )}
          <Button
            label="Cerrar sesión"
            onClick={handleLogOut}
            className="header-button hs-dropdown-item"
            variant="primary"
            data-testid="dropdownLogoutButton"
          />
        </div>
      )}
    </div>
  );
};

export default HeaderSession;
