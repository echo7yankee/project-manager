import React, { useState, useEffect } from 'react';

//style
import style from './tasks.module.css';

//components
import { TaskCreator } from './TaskCreator';
import { TaskForm } from './TaskForm';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getTasks } from '../../../Redux/actions/task';
import { Task } from './Task';

export const Tasks = ({ history }) => {
    const [toggleTaskForm, setToggleTaskForm] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const projectId: string = history.location.pathname.split('project/').pop();
    const projectName: string = history.location.search.split('=').pop();

    //redux
    const tasks = useSelector(state => state.task.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(projectId));
    }, [dispatch, projectId]);

    function toggleForm(): void {
        setToggleTaskForm(true)
    }

    function closeForm(): void {
        setToggleTaskForm(false);
    }

    function handleChange(e: { target: { value: React.SetStateAction<string>; }; }): void {
        setTaskValue(e.target.value);
    }

    function createTaskRequest(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        const newTask = {
            task: taskValue,
            date: new Date(),
            projectName,
            archived: false,
        }
        dispatch(createTask(projectId, newTask));
        setTaskValue('');
    };

    return (
        <div className={style.tasks}>
            <h1>{projectName}</h1>
            {tasks.length > 0 ? tasks && tasks.map(task => {
                return <ul key={task.id}>
                    <Task projectId={projectId} task={task} />
                </ul>
            }) : null}
            {toggleTaskForm ? <TaskForm
                buttonDo='Add Task'
                buttonClose='Cancel'
                onClickClose={closeForm}
                onChange={handleChange}
                inputValue={taskValue}
                request={createTaskRequest} />
                : <TaskCreator onClick={toggleForm} />}
        </div>
    )
}
