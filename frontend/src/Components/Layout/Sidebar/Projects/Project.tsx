import React from 'react';

//style
import style from './project.module.css';

export const Project = ({ project }): JSX.Element => {
    console.log(project);

    return (
        <ul className={style.projectItems}>
            <li className={style.projectItem}>
                <span className='dot'></span>
                <span>{project.name}</span>
            </li>
        </ul>
    )
};