import React from 'react';

//style
import { IoMdPerson } from 'react-icons/io';
import style from './accountSidebar.module.css';

//react router dom
import { NavLink } from 'react-router-dom';

export const AccountSidebar = (): JSX.Element => {
    return (
        <div className={style.accountSidebar}>
            <ul>
                <li className={style.accountSidebarItem}>
                    <NavLink activeClassName='active__account-sidebar-link' to='/account'>
                        <span><IoMdPerson /></span>
                        <span>Account</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};
