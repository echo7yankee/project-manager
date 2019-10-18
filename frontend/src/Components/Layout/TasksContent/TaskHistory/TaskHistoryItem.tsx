import React, { useState } from 'react';

//style
import { IoIosCheckmark, IoMdRemove } from 'react-icons/io';
import style from './taskHistory.module.css';

//redux
import { updateTask } from '../../../../Redux/actions/task';
import { useDispatch } from 'react-redux';
//import { Toast } from '../../../Toast/Toast';

export const TaskHistoryItem = ({ task, projectId }) => {

    const [toggleIcon, setToggleIcon] = useState(false);
    const dispatch = useDispatch();

    function setUncompletedTask(id) {
        if (task.id === id) {
            task = {
                ...task,
                completed: false,
            }

            dispatch(updateTask(projectId, task.id, task))
        }
    }

    return (
        <>
            <li className={style.taskHistoryItem} >
                <span
                    className={style.taskHistoryDot}
                    onClick={() => setUncompletedTask(task.id)}
                    onMouseOver={() => setToggleIcon(true)}
                    onMouseOut={() => setToggleIcon(false)} >
                    {toggleIcon ?
                        <IoMdRemove className={style.taskHistoryDotIcon} /> :
                        <IoIosCheckmark className={style.taskHistoryDotIcon} />}
                </span>
                <span>{task.task}</span>
            </li>
            {/* <Toast showToast={showToast} text='Task completed' /> */}
        </>
    )
}
