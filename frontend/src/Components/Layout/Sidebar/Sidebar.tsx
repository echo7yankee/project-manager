import React from 'react'

//style
import style from './sidebar.module.css';

//components
import { ArchivedProjects } from './ArchivedProjects/ArchivedProjects';
import { Projects } from './Projects/Projects'

export const Sidebar = ({ userId, history }) => {
    return (
        <div className={style.sidebar}>
            <Projects userId={userId} history={history} />
            <ArchivedProjects userId={userId} history={history}  />
        </div>
    )
}

