import React from 'react'

//style
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import style from './projectDropdown.module.css';

export const ProjectDropdown = () => {
    return (
        <div className={style.projectDropdown}>
            <ul>
                <li>
                    <span><IoMdCreate /></span>
                    <span>Edit Project</span>
                </li>
                <li>
                    <span><IoIosTrash /></span>
                    <span>Remove Project</span>
                </li>
            </ul>
        </div>
    )
}
