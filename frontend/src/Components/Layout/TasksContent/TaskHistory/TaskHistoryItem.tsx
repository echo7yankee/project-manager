import React from 'react';

//style
import { IoIosCheckmark } from 'react-icons/io';
import style from './taskHistory.module.css';

//redux
import { updateTask } from '../../../../Redux/actions/task';
import { useDispatch } from 'react-redux';

export const TaskHistoryItem = ({ task, projectId }) => {

    const dispatch = useDispatch();

    function setUncompletedTask(id) {
        if (task.id === id) {
            task = {
                ...task,
                completed: false
            }

            dispatch(updateTask(projectId, task.id, task))
        }
    }

    return (
        <li className={style.taskHistoryItem} >
            <span className={style.taskHistoryDot} onClick={() => setUncompletedTask(task.id)} > <IoIosCheckmark className={style.taskHistoryDotIcon} /> </span>
            <span>{task.task}</span>
        </li>
    )
}
