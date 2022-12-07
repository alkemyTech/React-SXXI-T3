import { useLogo } from "./hook";

import s from './headerBackoffice.module.css'
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderSession from "../Header/HeaderSession/HeaderSession";

const HeaderBackoffice = () => {
    const [logoONG, isFetching] = useLogo();
    const [showSidebar, setShowSidebar] = useState();
    const [showInfo, setShowInfo] = useState(false);


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
                <HeaderSession showInfo={showInfo} handleShowInfo={handleShowInfo}/>
                <div className={s['logo-header']}>
                    {
                        isFetching
                            ? null
                            : <Link to='/'><img src={logoONG} alt="logo" /></Link>
                    }
                </div>
            </div>
            <Sidebar active={showSidebar} />
        </>
    )
}

export default HeaderBackoffice;