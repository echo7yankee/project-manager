import React, { useState } from 'react';

//style
import style from './project.module.css';
import { IoIosMore } from 'react-icons/io';


//Components
import { ProjectDropdown } from './ProjectDropdown';

export const Project = ({ project }): JSX.Element => {

    const [dropdown, setDropdown] = useState(false);

    function openDropdown() {
        setDropdown(!dropdown);
    }

    return (
        <ul className={style.projectItems}>
            <li className={style.projectItem} >
                <div>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </div>
                <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <ProjectDropdown />}
            </li>
        </ul>
    )
};