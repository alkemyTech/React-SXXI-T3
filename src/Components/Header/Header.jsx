import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import './Header.css';
import { selectAuth, logout } from "../../features/auth/authSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(selectAuth);

    const dataArray = [
        { text: 'Inicio', link: '/' },
        { text: 'Nosotros', link: '/nosotros' },
        { text: 'Novedades', link: '/novedades' },
        { text: 'Testimonios', link: '/testimonios' },
        { text: 'Contacto', link: '/contacto' },
        { text: 'Contribuye', link: '/donar' }
    ]

    const handleClick = () => {
        dispatch(logout());
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="Somos Mas Logo"
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="nav">
                        {dataArray.map((element, index) =>
                            <Link key={uuidv4()} to={element.link}>{element.text}</Link>)}
                    </Nav>
                    <Nav className="nav">
                        {
                            token
                                ? <Link to={'/login'}>
                                    <Button
                                        onClick={handleClick}
                                        className="registerButton"
                                    >
                                        Cerrar sesión
                                    </Button>
                                </Link>
                                : <>
                                    <Link to='/login'>
                                        <Button className="loginButton">Iniciar sesión</Button>
                                    </Link>
                                    <Link to='/register'>
                                        <Button className="registerButton">Registrarse</Button>
                                    </Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
