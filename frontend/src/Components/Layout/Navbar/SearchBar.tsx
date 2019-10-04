import React from 'react';

import { IoMdSearch } from 'react-icons/io';

//style
import style from './navbar.module.css';

export const SearchBar = (): JSX.Element => {
    return (
        <form className={style.searchBarForm}>
            <span className={style.searchBarIcon}><IoMdSearch /></span>
            <input type='text' placeholder='Quick find' />
        </form>
    )
};
