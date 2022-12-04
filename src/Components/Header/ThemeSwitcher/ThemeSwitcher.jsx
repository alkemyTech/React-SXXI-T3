import { motion } from "framer-motion";

import { ReactComponent as SunSvg } from "../../../assets/svg/switch/sun.svg";
import { ReactComponent as MoonSvg } from "../../../assets/svg/switch/moon.svg";

import './ThemeSwitcher.css';


export const ThemeSwitcher = ({ switchTheme, theme }) => {
    return (
        <motion.button
            className="toggle-theme"
            onClick={switchTheme}
            whileTap={{ scale: 0.8, rotate: 180 }}
            whileHover={{ scale: 1.25 }}
        >
            {theme === 'dark' ?
                <MoonSvg className="moon" />
                :
                <SunSvg className="moon" />
            }
        </motion.button>
    )
}
