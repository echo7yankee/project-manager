import React from 'react';

//style
import style from './tasks.module.css';

export const Task = ({ task }) => {
    return (
        <div className={style.taskContainer}>
            <span className={style.task}>{task.task}</span>
        </div>
    )
};