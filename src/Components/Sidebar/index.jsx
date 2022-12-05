import { v4 as uuidv4 } from "uuid";

import Section from "./Section";

import { sections } from "./sections";
import s from "./sidebar.module.css";

const Sidebar = ({ active }) => {
    return (
        <div className={active ? s['sidebar-active'] : s['sidebar-hidden']}>
            {
                sections.map((section) => (
                    <Section key={uuidv4()} {...section} />
                ))
            }
        </div>
    )
}

export default Sidebar;