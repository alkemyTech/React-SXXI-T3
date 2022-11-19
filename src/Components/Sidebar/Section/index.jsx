import { NavLink } from "react-router-dom"
import { motion } from "framer-motion";

import s from './section.module.css';

const active = {
    color: 'var(--color-primary)',
    fontWeight: 700
}

const Section = ({ name, path, logo }) => {
    return (
        <NavLink
            to={path}
            style={({ isActive }) => isActive ? active : undefined}>
            <div className={s['link-container']}>
                <div
                    className={s["logo-container"]}
                    style={{ backgroundImage: `url(${logo})` }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >{name}</motion.div>
            </div>
        </NavLink>
    )
}

export default Section;