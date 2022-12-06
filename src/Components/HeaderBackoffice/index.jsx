import { useLogo } from "./hook";

import s from './headerBackoffice.module.css'
import Sidebar from "../Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";

const HeaderBackoffice = () => {

    const { user } = useSelector(selectAuth);
    const [logoONG, isFetching] = useLogo();
    const [showSidebar, setShowSidebar] = useState();
    const handleClick = () => {
        setShowSidebar(() => (!showSidebar));
    }
    return (
        <>
            <div className={s['header-backoffice']}>
                <button className={s['sidebar-controler']} onClick={handleClick}>|||</button>
                <div className={s['logo-header']}>
                    <div style={{ padding: '0 20px' }}>{user.name}</div>
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