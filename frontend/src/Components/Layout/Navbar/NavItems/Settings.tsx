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

            <div className={dropdown ? style.dropdownShow : style.dropdown} ref={wrapperRef}>
                <div className={style.dropdownItemContainer}>
                    <span className={style.dropdownIcon}><IoMdSettings /></span>
                    <span>Settings</span>
                </div >
                <div className={style.dropdownItemContainer}>
                    <span className={style.dropdownIcon}><IoIosColorPalette /></span>
                    <span>Theme</span>
                </div>
                <div className={style.dropdownItemContainer} onClick={() => dispatch(logoutUser())} >
                    <span className={style.dropdownIcon}><IoIosLogIn /></span>
                    <span>Logout</span>
                </div>
            </div>
        </li>
    )
};
