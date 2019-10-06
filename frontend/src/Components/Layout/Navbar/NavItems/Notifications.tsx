import React from 'react';

//style
import style from './navItems.module.css';
import { IoMdNotifications } from 'react-icons/io';

export const Notifications = (): JSX.Element => {
    return (
        <li>
            <span className={style.navItem}><IoMdNotifications /></span>
        </li>
    )
};