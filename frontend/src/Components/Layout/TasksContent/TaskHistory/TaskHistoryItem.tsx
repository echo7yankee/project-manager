import React from 'react';

//style
import { IoIosCheckmark } from 'react-icons/io';
import style from './taskHistory.module.css';

export const TaskHistoryItem = ({ task }) => {
    return (
        <li className={style.taskHistoryItem} >
            <span className={style.taskHistoryDot}> <IoIosCheckmark className={style.taskHistoryDotIcon} /> </span>
            <span>{task.task}</span>
        </li>
    )
}
