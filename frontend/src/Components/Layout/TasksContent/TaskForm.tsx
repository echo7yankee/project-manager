import React, { useEffect, useRef, SetStateAction } from 'react';

//style
import style from './tasks.module.css';

interface ITaskForm {
    buttonDo: string;
    buttonClose: string;
    onClickClose: () => void;
    inputValue: string;
    onChange: (e: { target: { value: SetStateAction<string>; }; }) => void;
    request: (e: { preventDefault: () => void; }) => void;
}

export const TaskForm = (props: ITaskForm): JSX.Element => {

    const inputRef: any = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <form className={style.taskForm} onSubmit={props.request} >
            <div className={style.taskFormInputGroup}>
                <input
                    type='text'
                    placeholder="Add a task ... e.g Read tonight's news"
                    value={props.inputValue}
                    onChange={props.onChange}
                    ref={inputRef} />
            </div>
            <div className={style.taskFormButtonContainer}>
                <button disabled={props.inputValue === ''}
                    className={props.inputValue === '' ? 'disabled-button' : ''}>{props.buttonDo}</button>
                <button onClick={props.onClickClose}>{props.buttonClose}</button>
            </div>
        </form>
    );
};