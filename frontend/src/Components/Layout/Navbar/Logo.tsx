import React from 'react';

//react router dom
import { Link } from 'react-router-dom';

//style
import style from './navbar.module.css'

export const Logo = (): JSX.Element => {
    return (
        <Link to='/' className={style.logoLink} >
            <img src='./images/logo.png' alt='Logo' />
        </Link>
    )
};
