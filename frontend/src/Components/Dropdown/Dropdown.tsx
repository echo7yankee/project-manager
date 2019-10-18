import React, { useRef, useState } from 'react';

//closedropdown
import { useOutsideClose } from '../CloseDropdown/CloseDropdown';


import style from './dropdown.module.css';

export const Dropdown = ({ closeDropdown, dropdownItems, left, top }) => {
    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, closeDropdown);

    const [cursor, setCursor] = useState(0);
    const refs: any = [];

    function setRef(ref, index) {
        refs.push(ref);
        index === cursor && ref && ref.focus();
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (cursor >= dropdownItems.length - 1) {
                    setCursor(0);
                    return;
                }
                setCursor(cursor + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (cursor <= 0) {
                    setCursor(dropdownItems.length - 1);
                    return;
                }
                setCursor(cursor - 1);
                break;
            case 'Enter':
                refs[cursor].click()
                break;
            default: console.log('hey')
        }
    }

    return (
        <div className={style.projectDropdown} ref={wrapperRef} style={{ left: left + '%', top: top + '%' }}>
            <ul onKeyDown={handleKeyDown}>
                {dropdownItems.map((item, index) => {
                    return (<li
                        ref={(ref) => setRef(ref, index)}
                        key={item.name}
                        onClick={item.action}
                        tabIndex={index}
                        className={item.className} >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </li>);
                })}
            </ul>
        </div>
    )
};