import { Button, ButtonGroup, Container, Nav, Navbar } from "react-bootstrap"
import logo from "../../assets/images/logo.png";
import './Header.css';

export const Header = ({
        isLogged=false, 
        handleLogged = () => {}, 
        ... props
    }
    ) => {

    const dataArray = [
        {text: 'Inicio', link: '/'},
        {text: 'Nosotros', link: '/nosotros'},
        {text: 'Novedades', link: '/novedades'},
        {text: 'Testimonios', link: '/testimonios'},
        {text: 'Contacto', link: '/contacto'},
        {text: 'Contribuye', link: '/donar'}
    ]

    return(
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
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="nav">
                    {dataArray.map((element, index) => 
                        <Nav.Link className="container" key={index} href={element.link}>{element.text}</Nav.Link>)}
                </Nav>
                <Nav className="nav">
                    {isLogged ?
                        <>
                            <Button className="loginButton" href="/login">Iniciar sesión</Button>
                            <Button className="registerButton" href="/register">Registrarse</Button>
                        </>
                    :   <>
                            <Button className="registerButton" href="/">Cerrar sesión</Button>
                        </>
                    }
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    )
}