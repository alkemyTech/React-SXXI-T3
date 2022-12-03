import {Container, Nav, Navbar} from "react-bootstrap"
import {Link, Outlet, useNavigate} from "react-router-dom";

import Button from "../Button/Button";
import {v4 as uuidv4} from 'uuid';
import './Header.css';
import {useLogo} from "../../hooks/useLogo";
import HeaderSession from "./HeaderSession";
import {useState} from "react";

//TODO: CAMBIAR DESPUES EN DEV
export const Header = ({
                           isLogged = false,
                           handleLogged = () => {
                           },
                           switchTheme,
                           theme,
                           ...props
                       }
) => {
    const navigate = useNavigate();
    const dataArray = [
        {text: 'Inicio', link: '/'},
        {text: 'Nosotros', link: '/nosotros'},
        {text: 'Actividades', link: '/actividades'},
        {text: 'Novedades', link: '/novedades'},
        {text: 'Contacto', link: '/contacto'},
        {text: 'Contribuye', link: '/donar'}
    ]
    const [logoONG, isFetching] = useLogo();
    const [showInfo, setShowInfo] = useState(false);
    const handleLogOut = () => {
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/registro')
    }

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
    }


    return (
        <>
            <Navbar expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand>
                        {
                            isFetching
                            ? null
                            : <Link to="/">
                                <img src={logoONG}
                                    alt="logo"
                                    width="90"
                                    height="55"
                                    className="d-inline-block align-top"/>
                            </Link>
                        }
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                    <HeaderDropdown className="mobile" showInfo={showInfo} handleShowInfo={handleShowInfo}
                                    switchTheme={switchTheme} theme={theme} handleLogIn={handleLogIn}
                                    handleRegister={handleRegister}/>

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="nav">
                            {dataArray.map((element) =>
                                <Link key={uuidv4()} to={element.link}
                                      className="container nav-link">{element.text}</Link>)}
                        </Nav>
                    </Navbar.Collapse>

                    <HeaderDropdown className="notMobile" showInfo={showInfo} handleShowInfo={handleShowInfo}
                                    switchTheme={switchTheme} theme={theme} handleLogIn={handleLogIn}
                                    handleRegister={handleRegister}/>

                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}


const HeaderDropdown = ({
                            isLogged = false,
                            showInfo,
                            handleShowInfo,
                            switchTheme,
                            theme,
                            handleLogIn,
                            handleRegister,
                            className
                        }) => {
    return (
        <Nav className={`nav header-dropdown ${className}`}>
            {!isLogged ?
             <>
                 <HeaderSession showInfo={showInfo} handleShowInfo={handleShowInfo} switchTheme={switchTheme}
                                theme={theme}/>
             </>
                       : <>
                 <Button label="Iniciar Sesión" onClick={handleLogIn} className="header-button"/>
                 <Button label="Registrarse" onClick={handleRegister} variant="primary"
                         className="header-button"/>
             </>
            }
        </Nav>)
}