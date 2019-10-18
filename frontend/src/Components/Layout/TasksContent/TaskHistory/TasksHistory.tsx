import React from 'react';

//tstypes
import { ITask } from '../../../../TSTypes/Task';

//style
import style from './taskHistory.module.css';

//redux
import { TaskHistoryItem } from './TaskHistoryItem';

export const TasksHistory = ({ tasks, projectId }) => {

    const completedTasks: ITask[] = tasks.filter(task => task.completed === true);

    console.log(tasks)

    return (
        <div className={style.taskHistoryContainer}>
            <ul className={style.taskHistoryList}>
                {completedTasks.map((task: ITask) => {
                    return <TaskHistoryItem key={task.id} task={task} projectId={projectId} />
                })}
            </ul>
        </div>
    )
}
