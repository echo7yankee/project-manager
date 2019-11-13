import React from 'react';

//style
import style from './navbarAccount.module.css';

//components
import { NavbarAccountItems } from './NavbarAccountItems'

export const NavbarAccount = (): JSX.Element => {
    return (
        <nav className={style.navbarAccount}>
            <div className='container'>
                <NavbarAccountItems />
            </div>
        </nav>
    )
}
