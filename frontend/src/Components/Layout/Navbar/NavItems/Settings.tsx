import React, { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { Auth } from '../../../../Redux/actions/auth';

//style
import style from './navItems.module.css'
import { IoMdSettings, IoIosLogIn, IoIosColorPalette } from 'react-icons/io';


export const Settings = (): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);

    //redux
    const dispatch = useDispatch();
    const auth = new Auth();

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    return (
        <li className='pos-relative' onClick={toggleDropdown}>
            <span className={style.navItem}><IoMdSettings /></span>

            <div className={dropdown ? style.dropdownShow : style.dropdown}>
                <div className={style.dropdownItemContainer}>
                    <span className={style.dropdownIcon}><IoMdSettings /></span>
                    <span>Settings</span>
                </div >
                <div className={style.dropdownItemContainer}>
                    <span className={style.dropdownIcon}><IoIosColorPalette /></span>
                    <span>Theme</span>
                </div>
                <div className={style.dropdownItemContainer} onClick={() => dispatch(auth.logoutUser())} >
                    <span className={style.dropdownIcon}><IoIosLogIn /></span>
                    <span >Logout</span>
                </div>
            </div>
        </li>
    )
};
