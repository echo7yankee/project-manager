import React from 'react'

//style
import { IoMdAdd } from 'react-icons/io';
import style from './tasks.module.css';

export const TaskCreator = ({ onClick }): JSX.Element => {
    return (
        <div className={style.addTaskContainer} onClick={onClick} >
            <span><IoMdAdd /></span>
            <button>Add Task</button>
        </div>
    )
};