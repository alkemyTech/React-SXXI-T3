import {useLocation, useNavigate} from "react-router-dom";

import {defaultImage} from "../../utils/defaultImage";

import './HeaderSession.css';
import Button from "../Button/Button";
import {ThemeSwitcher} from "./ThemeSwitcher/ThemeSwitcher";

//TODO: CAMBIAR DESPUES EN DEV
const HeaderSession = ({showInfo, handleShowInfo, switchTheme, theme}) => {
    const user = {
        "id": 4132,
        "name": "User Name",
        "email": "asd@gml.com",
        "email_verified_at": null,
        "password": "Aa1234*",
        "role_id": 1,
        "remember_token": null,
        "created_at": "2022-12-03T06:53:51.000000Z",
        "updated_at": "2022-12-03T06:53:51.000000Z",
        "deleted_at": null,
        "group_id": null,
        "latitude": null,
        "longitude": null,
        "address": null,
        "profile_image": null
    }
    const location = useLocation();
    const navigate = useNavigate()
    const isAdmin = user.role_id === 1;
    const isBackoffice = location.pathname.includes('backoffice');
    const linkTo = isBackoffice ? '/' : '/backoffice';

    const handleLogOut = () => {
        navigate('/login');
    }

    const handleRedirect = () => {
        navigate(linkTo);
    }

    return (
        <div className="hs-dropdown">
            <button className="hs-dropdown-container" onClick={handleShowInfo}>
                <img alt={user.name} src={user.image_profile || defaultImage} className="hs-img"/>
                <div className="hs-text username-head">{user.name || 'Usuario'}</div>
                <span className="hs-text"/>
            </button>
            {showInfo &&
                <div className="hs-dropdown-content">
                    <div className="hs-text username-content">{user.name || 'Usuario'}</div>
                    <small className="hs-dropdown-item role">Usuario {isAdmin ? 'Administrador' : 'Regular'}</small>
                    <hr className="hs-dropdown-item"/>
                    <div className="hs-dropdown-item">
                        <small>Tema {theme === 'dark' ? 'oscuro ' : 'claro '}</small><ThemeSwitcher switchTheme={switchTheme} theme={theme}/>
                    </div>
                    {isAdmin &&
                        <Button label={isBackoffice ? 'Home' : 'Backoffice'} onClick={handleRedirect} className="header-button hs-dropdown-item" variant="primary"/>
                    }
                    <Button label="Cerrar sesión" onClick={handleRedirect} className="header-button hs-dropdown-item" variant="primary"/>
                </div>
            }
        </div>
    )
}

export default HeaderSession;