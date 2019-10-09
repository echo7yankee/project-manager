import React, { useState, useRef } from 'react';

//close dropdown
import { useOutsideClose } from '../../../CloseDropdown/CloseDropdown';

//redux
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../Redux/actions/auth';

//style
import style from './navItems.module.css'
import { IoMdSettings, IoIosLogIn, IoIosColorPalette } from 'react-icons/io';


export const Settings = (): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);

    //redux
    const dispatch = useDispatch();

    function toggleDropdown() {
        setDropdown(!dropdown);
    }

    function closeDropdown() {
        setDropdown(false);
    }

    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, closeDropdown);

    return (
        <li className='pos-relative' onClick={toggleDropdown}>
            <span className={style.navItem}><IoMdSettings /></span>

            <ul className={dropdown ? style.dropdownShow : style.dropdown} ref={wrapperRef}>
                <li className={style.dropdownItem}>
                    <span className={style.dropdownIcon}><IoMdSettings /></span>
                    <span>Settings</span>
                </li >
                <li className={style.dropdownItem}>
                    <span className={style.dropdownIcon}><IoIosColorPalette /></span>
                    <span>Theme</span>
                </li>
                <li className={`${style.dropdownItem} dropdown__remove`} onClick={() => dispatch(logoutUser())} >
                    <span className={style.dropdownIcon}><IoIosLogIn /></span>
                    <span>Logout</span>
                </li>
            </ul>
        </li>
    )
};
