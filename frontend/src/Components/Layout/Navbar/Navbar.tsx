import React from 'react';

//Style
import style from './navbar.module.css';

//cOMPONENTS
import { Logo } from './Logo';
import { NavItems } from './NavItems/NavItems';
import { SearchBar } from './SearchBar';

export const Navbar = (): JSX.Element => {
    return (
        <nav className={style.navbar}>
            <div className='container dflex space-between'>
                <Logo />
                <SearchBar />
                <NavItems />
            </div>
        </nav>
    )
};