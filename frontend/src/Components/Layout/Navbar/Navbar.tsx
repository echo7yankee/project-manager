import React, { useState } from 'react';

//Style
import style from './navbar.module.css';

//cOMPONENTS
import { Logo } from './Logo';
import { NavItems } from './NavItems/NavItems';
import { SearchBar } from './SearchBar';

export const Navbar = (): JSX.Element => {

    const [searchValue, setSearchValue] = useState('');

    function handleChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setSearchValue(e.target.value)
    }

    function destroy(): void {
        setSearchValue('');
    }

    return (
        <nav className={style.navbar}>
            <div className='container dflex space-between'>
                <Logo />
                <SearchBar
                    destroy={destroy}
                    inputValue={searchValue}
                    onChange={handleChange} />
                <NavItems />
            </div>
        </nav>
    )
};