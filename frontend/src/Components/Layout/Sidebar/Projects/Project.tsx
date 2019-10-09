import React from 'react';

//style
import style from './project.module.css';
import { IoIosMore } from 'react-icons/io';

export const Project = ({ project }): JSX.Element => {

    return (
        <ul className={style.projectItems}>
            <li className={style.projectItem}>
                <div>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </div>
                <span className={style.projectItemSettings}><IoIosMore /></span>
            </li>
        </ul>
    )
};