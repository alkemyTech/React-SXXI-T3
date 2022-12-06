import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../Button/Button";
import { v4 as uuidv4 } from "uuid";
import "./Header.css";
import { useLogo } from "../../../hooks/useLogo";
import HeaderSession from "../HeaderSession/HeaderSession";
import { useState } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../features/auth/authSlice";
import { useMinWindowSize } from "../../../hooks/useMinWindowSize";

export const Header = ({
  isLogged = false,
  handleLogged = () => {},
  switchTheme,
  theme,
  ...props
}) => {
  const { token } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dataArray = [
    { text: "Inicio", link: "/" },
    { text: "Nosotros", link: "/nosotros" },
    { text: "Actividades", link: "/actividades" },
    { text: "Novedades", link: "/novedades" },
    { text: "Contacto", link: "/contacto" },
  ];
  const [logoONG, isFetching] = useLogo();
  const [showInfo, setShowInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
    const isExpandable = useMinWindowSize(992);
  const handleLogIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/registro");
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
      <Navbar expand="lg" sticky="top" expanded={expanded} onClick={() => {
          if(isExpandable) {setExpanded(expanded ? false : "expanded")}
      }}>
      <Container fluid>
          <Navbar.Brand>
            {isFetching ? null : (
              <Link to="/">
                <img
                  src={logoONG}
                  alt="logo"
                  width="90"
                  height="55"
                  className="d-inline-block align-top"
                />
              </Link>
            )}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <HeaderDropdown
            className="mobile"
            showInfo={showInfo}
            handleShowInfo={handleShowInfo}
            switchTheme={switchTheme}
            theme={theme}
            isLogged={!!token}
          />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="nav">
              {dataArray.map((element) => (
                <Link
                  key={uuidv4()}
                  to={element.link}
                  className="container nav-link"
                >
                  {element.text}
                </Link>
              ))}
              {!token && (
                <div className="nav header-button-container">
                  <Button
                    label="Iniciar Sesión"
                    onClick={handleLogIn}
                    className="header-button"
                    variant="tertiary"
                  />
                  <Button
                    label="Registrarse"
                    onClick={handleRegister}
                    variant="primary"
                    className="header-button"
                  />
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
          <HeaderDropdown
            className="notMobile"
            showInfo={showInfo}
            handleShowInfo={handleShowInfo}
            switchTheme={switchTheme}
            theme={theme}
            isLogged={!!token}
          />
        </Container>
      </Navbar>
  );
};

const HeaderDropdown = ({
  showInfo,
  handleShowInfo,
  switchTheme,
  theme,
  className,
  isLogged,
}) => {
  return (
    <Nav className={`nav header-dropdown ${className}`}>
      {isLogged ? (
        <HeaderSession
          showInfo={showInfo}
          handleShowInfo={handleShowInfo}
          switchTheme={switchTheme}
          theme={theme}
        />
      ) : (
        <ThemeSwitcher switchTheme={switchTheme} theme={theme} />
      )}
    </Nav>
  );
};
