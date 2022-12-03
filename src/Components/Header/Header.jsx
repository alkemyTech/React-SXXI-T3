import {Container, Nav, Navbar} from "react-bootstrap"
import {Outlet, useNavigate} from "react-router-dom";

import Button from "../Button/Button";
import {ThemeSwitcher} from "./ThemeSwitcher/ThemeSwitcher";

import './Header.css';
import {useLogo} from "../../hooks/useLogo";

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

    const handleLogOut = () => {
    }

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/registro')
    }

    return (
        <>
            <Navbar expand="lg" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="/">
                        {
                            isFetching
                            ? null
                            : <img src={logoONG}
                                   alt="logo"
                                   width="90"
                                   height="55"
                                   className="d-inline-block align-top"/>
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="nav">
                            {dataArray.map((element, index) =>
                                <Nav.Link className="container" key={index}
                                          href={element.link}>{element.text}</Nav.Link>)}
                        </Nav>
                        <Nav className="nav header-buttons">
                            {isLogged ?
                             <>
                                 <Button label="Cerrar Sesión" onClick={handleLogOut} variant="primary"
                                         className="header-button"/>
                             </>
                                      : <>
                                 <Button label="Iniciar Sesión" onClick={handleLogIn} className="header-button"/>
                                 <Button label="Registrarse" onClick={handleRegister} variant="primary"
                                         className="header-button"/>
                             </>
                            }
                            <ThemeSwitcher switchTheme={switchTheme} theme={theme}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </>
    )
}
