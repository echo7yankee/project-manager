import React from 'react';

//style
import style from './navItems.module.css';

//Components
import { AddTask } from './AddTask';
import { Notifications } from './Notifications';
import { Settings } from './Settings';

export const NavItems = (): JSX.Element => {
    return (
        <ul className={style.navItems}>
            <AddTask />
            <Notifications />
            <Settings />
        </ul>
    )
};
