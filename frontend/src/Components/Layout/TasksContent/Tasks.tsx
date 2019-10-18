import React, { useEffect, useState } from 'react';
import spinner from '../../../assets/gifs/spinner.gif';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

//components
import { TaskCreator } from './TaskCreator';
import { TaskForm } from './TaskForm';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getTasks } from '../../../Redux/actions/task';
import { Dropdown } from '../../Dropdown/Dropdown';
import { Task } from './Task';
import { TasksHistory } from './TaskHistory/TasksHistory';

export const Tasks = ({ history }) => {
    const [toggleTaskForm, setToggleTaskForm] = useState(false);
    const [taskValue, setTaskValue] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const projectId: string = history.location.pathname.split('project/').pop();
    const projectName: string = history.location.search.split('=').pop();

    //redux
    const tasks = useSelector(state => state.task.tasks);
    const isLoading = useSelector(state => state.task.isLoading);

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

    function openDropdown(): void {
        setDropdown(true);
    }

    function closeDropdown(): void {
        setDropdown(false);
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
            completed: false,
            archived: false,
        }
        dispatch(createTask(projectId, newTask));
        setTaskValue('');
    };

    const dropdownItems = [{
        name: 'Show completed tasks'
    }]

    const incompletedTasks = tasks.filter(task => task.completed !== true)

    return (
        <div className={style.tasks}>
            <div className={style.tasksTitleContainer} >
                <h1>{projectName}</h1>
                <span onClick={openDropdown} >
                    <IoIosMore />
                    {dropdown && <Dropdown closeDropdown={closeDropdown} dropdownItems={dropdownItems} left='0' top='0' />}
                </span>
            </div>
            {tasks.length > 0 ? tasks && incompletedTasks.map(task => {
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
            {isLoading && <div className='overlay'>
                <img src={spinner} alt='spinner' />
            </div>}

            <TasksHistory projectId={projectId} tasks={tasks} />
        </div>
    )
}
