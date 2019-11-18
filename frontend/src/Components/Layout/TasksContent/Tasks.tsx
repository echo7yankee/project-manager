import React, { useEffect, useRef, useState } from 'react';

//jwt
import jwt from 'jsonwebtoken';

//asset
import spinner from '../../../assets/gifs/spinner.gif';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

//components
import { Error } from '../../Error/Error';
import { TaskCreator } from './TaskCreator';
import { TaskForm } from './TaskForm';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getTasks } from '../../../Redux/actions/task';
import { Dropdown } from '../../Dropdown/Dropdown';
import { Toast } from '../../Toast/Toast';
import { Task } from './Task';
import { TasksHistory } from './TaskHistory/TasksHistory';

export const Tasks = ({ history: { location } }): JSX.Element => {
  const [toggleTaskForm, setToggleTaskForm] = useState(false);
  const [taskValue, setTaskValue] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const projectId: string = location.pathname.split('project/').pop();
  const projectName: string = location.search.split('?').pop();
  const isArchived: boolean = location.state;
  const inputRef: any = useRef(null);

  //redux
  const tasks = useSelector(state => state.task.tasks);
  const isLoading = useSelector(state => state.task.isLoading);
  const showToast = useSelector(state => state.task.showToast);
  const toastText = useSelector(state => state.task.toastText);
  const errors = useSelector(state => state.task.errors);

  const dispatch = useDispatch();

  //token
  let decodedToken;
  let userId;
  const token = localStorage.FBIdToken;

  if (token) {
    decodedToken = jwt.decode(token);
    userId = decodedToken.params && decodedToken.params.id;
  }

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
      schedule: selectedDay,
      projectName,
      completed: false,
      archived: isArchived,
      userId
    }
    dispatch(createTask(projectId, newTask));
    setTaskValue('');
    inputRef.current.focus();
  };

  function handleDayChange(date, modifiers) {
    if (modifiers.disabled) {
      return;
    }
    setSelectedDay(date)
  }

  const dropdownItems = [{
    name: 'Show completed tasks',
  }]

  const incompletedTasks = tasks.filter(task => task.completed !== true);

  return (
    <>
      <div className={style.tasks}>
        <div className={style.tasksTitleContainer} >
          <div>
            <h1>{projectName}</h1>
            {isArchived && <span>Archived</span>}
          </div>
          <span onClick={openDropdown} className={style.tasksTitleContainerDropdownAction} >
            <IoIosMore />
            {dropdown && <Dropdown
              closeDropdown={closeDropdown}
              dropdownItems={dropdownItems}
              left='0'
              top='0'
            />}
          </span>
        </div>
        {tasks.length > 0 ? tasks && incompletedTasks.map(task => {
          return <ul key={task.id}>
            <Task
              projectId={projectId}
              task={task}
              isArchived={isArchived}
              selectedDay={selectedDay}
              handleDayChange={handleDayChange}
              inputRef={inputRef}
            />
          </ul>
        }) : null}
        {toggleTaskForm ? <TaskForm
          buttonDo='Add Task'
          buttonClose='Cancel'
          onClickClose={closeForm}
          onChange={handleChange}
          inputValue={taskValue}
          request={createTaskRequest}
          selectedDay={selectedDay}
          handleDayChange={handleDayChange}
          inputRef={inputRef}
        />
          : !isArchived && <TaskCreator onClick={toggleForm}
          />}
        {errors.error && <Error textError={errors.error} />}
        <TasksHistory projectId={projectId} tasks={tasks} />
        <Toast showToast={showToast} text={toastText} backgroundColor='#383838' />
      </div>
      {isLoading && <div className='overlay'>
        <img src={spinner} alt='spinner' />
      </div>}
    </>
  );
}
