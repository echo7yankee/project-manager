import React, { useRef } from 'react';

//closedropdown
import { useOutsideClose } from '../CloseDropdown/CloseDropdown';

//style
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import style from './dropdown.module.css';

export const Dropdown = ({ closeDropdown, openModalDropdown, setState, name, left }) => {
    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, closeDropdown);

    return (
        <>
            <div className={style.projectDropdown} ref={wrapperRef} style={{ left: left + '%' }}>
                <ul>
                    <li onClick={setState}>
                        <span><IoMdCreate /></span>
                        <span>Edit {name}</span>
                    </li>
                    <li className='dropdown__remove' onClick={openModalDropdown}>
                        <span><IoIosTrash /></span>
                        <span>Remove {name}</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
