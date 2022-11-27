import { Container, Nav, Navbar } from "react-bootstrap"
import './Header.css';
import {Outlet, useNavigate} from "react-router-dom";
import Button from "../Button/Button";

export const Header = ({
        isLogged=false,
        handleLogged = () => {},
        ...props
    }
    ) => {
    const navigate = useNavigate();
    const dataArray = [
        // {text: 'Inicio', link: '/'},
        {text: 'Nosotros', link: '/nosotros'},
        {text: 'Actividades', link: '/actividades'},
        {text: 'Novedades', link: '/novedades'},
        {text: 'Testimonios', link: '/testimonios'},
        {text: 'Contacto', link: '/contacto'},
        {text: 'Contribuye', link: '/donar'}
    ]

    const handleLogOut = () => {}

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return(
        <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img
                    alt="Somos Mas Logo"
                    src="http://ongapi.alkemy.org/storage/khXifFLiXu.png"
                    width="90"
                    height="55"
                    className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="nav">
                    {dataArray.map((element, index) => 
                        <Nav.Link className="container" key={index} href={element.link}>{element.text}</Nav.Link>)}
                </Nav>
                <Nav className="nav header-buttons">
                    {isLogged ?
                        <>
                            <Button label="Cerrar Sesión" onClick={handleLogOut}  variant="primary" className="header-button"/>
                            {/*<Button className="registerButton" href="/">Cerrar sesión</Button>*/}
                        </>
                    :   <>
                         <Button label="Iniciar Sesión" onClick={handleLogIn}  className="header-button"/>
                         <Button label="Registrarse" onClick={handleRegister}  variant="primary" className="header-button"/>
                            {/*<Button className="loginButton" href="/login">Iniciar sesión</Button>*/}
                            {/*<Button className="registerButton" href="/register">Registrarse</Button>*/}
                        </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        <Outlet/>
    </>
    )
}
