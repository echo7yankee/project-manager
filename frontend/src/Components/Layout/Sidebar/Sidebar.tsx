import React from 'react'

//components
import { Projects } from './Projects/Projects'

//style
import style from './sidebar.module.css';

export const Sidebar = ({ userId, history }) => {
    return (
        <div className={style.sidebar}>
            <Projects userId={userId} history={history} />
        </div>
    )
}

