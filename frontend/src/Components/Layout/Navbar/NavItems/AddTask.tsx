import React from 'react';

//style
import style from './navItems.module.css'
import { IoMdAdd } from 'react-icons/io';

export const AddTask = (): JSX.Element => {
    return (
        <li>
            <span className={style.navItem}> <IoMdAdd /></span>
        </li>
    )
};
