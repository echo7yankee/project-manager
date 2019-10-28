import React, { SetStateAction, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

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
    destroy: () => void,
}

export const SearchBar = (props: ISearchBar): JSX.Element => {

    const [cursor, setCursor] = useState(0);
    const allTasks = useSelector(state => state.task.allTasks);
    const refs: any = []
    const inputRef: any = useRef();


    function filter(allTasks) {
        return allTasks.filter(task => {
            return task.task.toLowerCase().indexOf(props.inputValue.toLowerCase()) >= 0;
        })
    }

    function setRef(ref, index) {
        refs.push(ref);
        index + 1 === cursor && ref && ref.focus();
    }

    function handleKeyDown(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (cursor >= filter(allTasks).length) {
                    inputRef.current.focus()
                    setCursor(0);
                    return;
                }
                setCursor(cursor + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (cursor <= + 1) {
                    inputRef.current.focus()
                    return;
                }
                setCursor(cursor - 1);
                break;
            case 'Enter':
                refs[cursor].click()
                break;
            default: console.log('hey')
        }
    };
    //close dropdown
    const wrapperRef = useRef(null);
    useOutsideClose(wrapperRef, props.destroy);

    console.log(cursor)

    return (
        <>
            <form className={style.searchBarForm} onKeyDown={(e) => handleKeyDown(e)} >
                <span className={style.searchBarIcon}><IoMdSearch /></span>
                <input
                    type='text'
                    placeholder='Quick find'
                    value={props.inputValue}
                    onChange={props.onChange}
                    onKeyDown={e => {
                        if (e.key === 'ArrowDown') {
                            setCursor(1);
                        } else if (e.key === 'ArrowUp') {
                            setCursor(allTasks.length);
                        }
                    }}
                    ref={inputRef}
                />
                {props.inputValue && <div className={style.searchInfoContainer} ref={wrapperRef}>
                    <NavbarSearchInfo
                        destroy={props.destroy}
                        cursor={cursor}
                        filter={filter}
                        allTasks={allTasks}
                        setRef={setRef}
                    />
                </div>}
            </form>
        </>
    )
};
