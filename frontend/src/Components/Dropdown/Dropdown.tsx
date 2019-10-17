import React, { useRef } from 'react';

//closedropdown
import { useOutsideClose } from '../CloseDropdown/CloseDropdown';


import style from './dropdown.module.css';

export const Dropdown = ({ closeDropdown, dropdownItems, left, top }) => {
    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, closeDropdown);

    // const itemRef: any = useRef(null);

    // useEffect(() => {
    //     itemRef.current.focus();
    //     console.log(itemRef.current)
    // }, [])

    return (
        <div className={style.projectDropdown} ref={wrapperRef} style={{ left: left + '%', top: top + '%' }}>
            <ul >
                {dropdownItems.map(item => {
                    return (<li
                        key={item.name}
                        onClick={item.action}
                        className={item.className} >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </li>);
                })}
            </ul>
        </div>
    )
};