import React, { SetStateAction, useRef } from 'react';

//closedropdown
import { useOutsideClose } from '../../CloseDropdown/CloseDropdown';

//style
import { IoMdSearch } from 'react-icons/io';
import style from './navbar.module.css';

//components
import { NavbarSearchInfo } from './NavbarSearchInfo/NavbarSearchInfo';

interface ISearchBar {
    onChange: (e: { target: { value: SetStateAction<string>; }; }) => void,
    inputValue: string,
    destroy: () => void
}

function handleKeyDown(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        console.log(e.target.nextSibling.children)
    }
};

export const SearchBar = (props: ISearchBar): JSX.Element => {

    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, props.destroy);

    return (
        <>
            <form className={style.searchBarForm} onKeyDown={(e) => {
                handleKeyDown(e);
            }} >
                <span className={style.searchBarIcon}><IoMdSearch /></span>
                <input type='text' placeholder='Quick find' value={props.inputValue} onChange={props.onChange} />
                {props.inputValue && <div className={style.searchInfoContainer} ref={wrapperRef}>
                    <NavbarSearchInfo destroy={props.destroy} inputValue={props.inputValue} />
                </div>}
            </form>
        </>
    )
};
