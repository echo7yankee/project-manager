import React from 'react';

//style
import { IoIosClose } from 'react-icons/io';
import style from './navbarAccount.module.css';

//react router dom
import { Link } from 'react-router-dom';

export const NavbarAccountItems = (): JSX.Element => {
    return (
        <div className='dflex space-between'>
            <div className={style.navbarAccountSettings}>
                <h1>Settings</h1>
            </div>
            <div className={style.navAccountTitleContainer}>
                <Link to='/' className={style.navbarAccountClose}>
                    <span>Close</span>
                    <span><IoIosClose /></span>
                </Link>
            </div>
        </div>
    )
}
