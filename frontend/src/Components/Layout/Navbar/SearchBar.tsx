import React, { SetStateAction } from 'react';

//style
import { IoMdSearch } from 'react-icons/io';
import style from './navbar.module.css';

//components
import { NavbarSearchInfo } from './NavbarSearchInfo/NavbarSearchInfo';

interface ISearchBar {
    onChange: (e: { target: { value: SetStateAction<string>; }; }) => void,
    inputValue: string,
    onClick: () => void,
}

export const SearchBar = (props: ISearchBar): JSX.Element => {
    return (
        <>
            <form className={style.searchBarForm}>
                <span className={style.searchBarIcon}><IoMdSearch /></span>
                <input type='text' placeholder='Quick find' value={props.inputValue} onChange={props.onChange} />
                {props.inputValue && <div className={style.searchInfoContainer}>
                    <NavbarSearchInfo onClick={props.onClick} inputValue={props.inputValue} />
                </div>}
            </form>
        </>
    )
};
