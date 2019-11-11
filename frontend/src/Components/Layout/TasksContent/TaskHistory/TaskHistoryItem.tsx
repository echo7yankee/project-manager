import React, { useState } from 'react';

//style
import { IoIosCheckmark, IoMdRemove } from 'react-icons/io';
import style from './taskHistory.module.css';

//redux
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../../Redux/actions/task';
//import { Toast } from '../../../Toast/Toast';

export const TaskHistoryItem = ({ task, projectId }): JSX.Element => {
    const [toggleIcon, setToggleIcon] = useState(false);
    const dispatch = useDispatch();

    function setUncompletedTask() {
        task = {
            ...task,
            schedule: task.schedule * 1000,
            completed: false,
        }

        dispatch(updateTask(projectId, task.id, task))
    }

    return (
        <>
            <li className={style.taskHistoryItem} >
                <span
                    className={style.taskHistoryDot}
                    onClick={setUncompletedTask}
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
