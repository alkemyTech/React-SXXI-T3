import s from './headerBackoffice.module.css'
import Sidebar from "../Sidebar";
import { useState } from "react";
import {useLogo} from "../../hooks/useLogo";

const HeaderBackoffice = () => {

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
                    {
                        isFetching
                            ? null
                            : <img src={logoONG} alt="logo" />
                    }
                </div>
            </div>
            <Sidebar active={showSidebar} />
        </>
    )
}

export default HeaderBackoffice;