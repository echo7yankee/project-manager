import React, { useState } from 'react';

//tstypes
import { ITask } from '../../../../TSTypes/Task';

//style
import { IoIosArrowDown } from 'react-icons/io';
import style from './taskHistory.module.css';

//redux
import { TaskHistoryItem } from './TaskHistoryItem';

export const TasksHistory = ({ tasks, projectId }) => {

    const [toggleHistoryTasks, setToggleHistoryTasks] = useState(false);
    const completedTasks: ITask[] = tasks.filter(task => task.completed === true);

    return (
        <div className={style.taskHistoryContainer}>
            {completedTasks.length &&
                <div onClick={() => setToggleHistoryTasks(!toggleHistoryTasks)}>
                    <span className={`${style.historyTasksTitleIcon} mr-1`}>
                        <IoIosArrowDown className={toggleHistoryTasks ? 'rotate-0' : 'rotate-90'} />
                    </span>
                    <div>
                        <span>Completed tasks </span>
                        <span> {completedTasks.length}</span>
                    </div>
                </div>}
            <ul className={toggleHistoryTasks ? style.taskHistoryList : style.taskHistoryListHidden}>
                {completedTasks.map((task: ITask) => {
                    return <TaskHistoryItem key={task.id} task={task} projectId={projectId} />
                })}
            </ul>
        </div>
    )
}
