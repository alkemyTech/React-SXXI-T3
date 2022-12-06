import s from "./headerBackoffice.module.css";
import Sidebar from "../../Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogo } from "../../../hooks/useLogo";
import defaultLogo from "../../../assets/images/somosMasLogo.png";
import HeaderSession from "../HeaderSession/HeaderSession";

const HeaderBackoffice = ({ theme, switchTheme }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [logoONG, isFetching] = useLogo();
    const [showSidebar, setShowSidebar] = useState();

    const handleClick = () => {
        setShowSidebar(() => (!showSidebar));
    }

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <>
            <div className={s['header-backoffice']}>
                <button className={s['sidebar-controler']} onClick={handleClick}>|||</button>
                <HeaderSession showInfo={showInfo} handleShowInfo={handleShowInfo} theme={theme} switchTheme={switchTheme} />
                <Link className={s['logo-header']} to='/'>
                    {
                        isFetching
                            ? null
                            : <img src={logoONG || defaultLogo} alt="logo" />
                    }
                </Link>
            </div>
            <Sidebar active={showSidebar} handleClick={handleClick} />
        </>
    )
}

export default HeaderBackoffice;