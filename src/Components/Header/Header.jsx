import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import './Header.css';
import { selectAuth, } from "../../features/auth/authSlice";
import {useState} from "react";
import HeaderSession from "./HeaderSession/HeaderSession";
import {linksArray} from "../../utils/linksArray";

export const Header = () => {
    const { token } = useSelector(selectAuth);
    const [showInfo, setShowInfo] = useState(false);

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    };

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
                        {linksArray.map((element, index) =>
                            <Link key={uuidv4()} to={element.link}>{element.text}</Link>)}
                    </Nav>
                    <Nav className="nav">
                        {
                            token
                                ?
                            <Nav className="nav header-dropdown"  data-testid="headerDropdown">
                                <HeaderSession
                                    showInfo={showInfo}
                                    handleShowInfo={handleShowInfo}
                                />
                            </Nav>
                                : <>
                                    <Link to='/login' data-testid="loginButton">
                                        <Button className="loginButton">Iniciar sesión</Button>
                                    </Link>
                                    <Link to='/register' data-testid="registerButton">
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
