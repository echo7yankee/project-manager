import React, { useRef } from 'react'

//closedropdown
import { useOutsideClose } from '../../../CloseDropdown/CloseDropdown';

//style
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import style from './projectDropdown.module.css';

export const ProjectDropdown = ({ closeDropdown }) => {
    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, closeDropdown);

    return (
        <div className={style.projectDropdown} ref={wrapperRef}>
            <ul>
                <li>
                    <span><IoMdCreate /></span>
                    <span>Edit Project</span>
                </li>
                <li>
                    <span><IoIosTrash /></span>
                    <span>Remove Project</span>
                </li>
            </ul>
        </div>
    )
}
