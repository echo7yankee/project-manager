import React from 'react';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

export const Task = ({ task }) => {
    return (
        <div className={style.taskContainer}>
            <span className={style.task}>{task.task}</span>
            <span className={style.taskItemSettings}><IoIosMore /></span>
        </div>
    )
};