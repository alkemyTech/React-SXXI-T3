import s from "./headerBackoffice.module.css";
import Sidebar from "../../Sidebar";
import {useState} from "react";
import {useLogo} from "../../../hooks/useLogo";
import HeaderSession from "../HeaderSession/HeaderSession";

const HeaderBackoffice = ({theme, switchTheme}) => {
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
                <HeaderSession showInfo={showInfo} handleShowInfo={handleShowInfo} theme={theme} switchTheme={switchTheme}/>
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