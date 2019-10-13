import React from 'react'

//components
import { Projects } from './Projects/Projects'

//style
import style from './sidebar.module.css';

export const Sidebar = ({ userId }) => {
    return (
        <div className={style.sidebar}>
            <Projects userId={userId} />
        </div>
    )
}

