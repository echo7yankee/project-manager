import React from 'react';

//style
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import style from './accountSidebar.module.css';

//react router dom
import { NavLink } from 'react-router-dom';

export const AccountSidebar = (): JSX.Element => {
  return (
    <div className={style.accountSidebar}>
      <ul>
        <li className={style.accountSidebarItem}>
          <NavLink activeClassName='active__account-sidebar-link' to='/prefs/account'>
            <span><IoMdPerson className='account__sidebar-icon-grey' /></span>
            <span>Account</span>
          </NavLink>
        </li>
        <li className={style.accountSidebarItem}>
          <NavLink activeClassName='active__account-sidebar-link' to='/prefs/theme'>
            <span><IoMdSettings className='account__sidebar-icon-grey' /></span>
            <span>Theme</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
};
