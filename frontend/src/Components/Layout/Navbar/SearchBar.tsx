import React, { SetStateAction } from 'react';

//style
import style from './navbar.module.css';
import { IoMdSearch } from 'react-icons/io';


//components
import { NavbarSearchInfo } from './NavbarSearchInfo/NavbarSearchInfo';

interface ISearchBar {
    onChange: (e: { target: { value: SetStateAction<string>; }; }) => void,
    inputValue: string
}

export const SearchBar = (props: ISearchBar): JSX.Element => {
    return (
        <>
            <form className={style.searchBarForm}>
                <span className={style.searchBarIcon}><IoMdSearch /></span>
                <input type='text' placeholder='Quick find' value={props.inputValue} onChange={props.onChange} />
                {props.inputValue && <div className={style.searchInfoContainer}><NavbarSearchInfo inputValue={props.inputValue} /></div>}
            </form>
        </>
    )
};
