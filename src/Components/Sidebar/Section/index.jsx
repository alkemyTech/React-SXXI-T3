import { NavLink } from "react-router-dom"

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
                <div className="section-name">
                    {name}
                </div>
            </div>
        </NavLink>
    )
}

export default Section;