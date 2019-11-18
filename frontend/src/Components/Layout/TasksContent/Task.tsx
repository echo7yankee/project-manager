import React, { useState } from 'react';

//moment
import moment from 'moment';

//redux
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../../Redux/actions/task';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

//style
import { IoIosTrash, IoMdCreate } from 'react-icons/io';

//components
import { Dropdown } from '../../Dropdown/Dropdown';
import { ModalDropdown } from '../../modal/ModalDropdown';
import { TaskForm } from './TaskForm';

interface ITask {
  task;
  projectId: string,
  isArchived: boolean,
  selectedDay: Date,
  handleDayChange;
  inputRef;
}

export const Task = (props: ITask): JSX.Element => {

  const [dropdown, setDropdown] = useState(false);
  const [modalDropdown, setModalDropdown] = useState(false);
  const [taskValueEdit, setTaskValueEdit] = useState(props.task.task);
  const [isEditable, setIsEditable] = useState(false);

  //redux
  const dispatch = useDispatch();

  //dropdown toggle
  function openDropdown(): void {
    setDropdown(true);
  }

  function closeDropdown(): void {
    setDropdown(false);
  }

  //MODAL FROM DROPDOWN TOGGLE
  function openModalDropdown(): void {
    setModalDropdown(!modalDropdown);
    closeDropdown();
  }

  function closeModalDropdown(): void {
    setModalDropdown(false);
  }

  //isEditable toggle
  function setEditable(): void {
    setIsEditable(!isEditable);
    closeDropdown();
  }

  function handleChange(e) {
    setTaskValueEdit(e.target.value);
  }

  function removeSelectedTask(): void {
    dispatch(removeTask(props.projectId, props.task.id));
  }

  function setCompletedTask(id): void {
    if (props.task.id === id) {
      props.task = {
        ...props.task,
        schedule: props.task.schedule * 1000,
        completed: true,
      }
      dispatch(updateTask(props.projectId, props.task.id, props.task));
    }
  }

  function editSelectedTask(e): void {
    e.preventDefault();

    const newTaskValue = {
      ...props.task,
      schedule: props.selectedDay,
      task: taskValueEdit,
    }

    dispatch(updateTask(props.projectId, props.task.id, newTaskValue));
    setEditable();
    closeDropdown();
  }

  const createIcon: JSX.Element = <IoMdCreate />;
  const trash: JSX.Element = <IoIosTrash />;

  const dropdownItems = [{
    name: 'Edit Task',
    action: setEditable,
    className: '',
    icon: createIcon,
  },
  {
    name: 'Remove Task',
    action: openModalDropdown,
    className: 'dropdown__remove',
    icon: trash,
  },];

  const question: string = `Are you sure you want to remove ${props.task.task}?`;

  return (
    <>
      {isEditable ? !props.isArchived && <TaskForm
        buttonDo='Edit Task'
        buttonClose='Cancel'
        onClickClose={setEditable}
        onChange={handleChange}
        inputValue={taskValueEdit}
        request={editSelectedTask}
        selectedDay={new Date(props.task.schedule * 1000)}
        inputRef={props.inputRef}
        handleDayChange={props.handleDayChange} /> : <li className={style.taskItem}>
          <div>
            <div className='dflex'>
              {!props.isArchived && <span className={style.taskDot} onClick={() => setCompletedTask(props.task.id)} ></span>}
              <span className={style.task} onClick={props.isArchived ? () => console.log('hello') : setEditable}>
                {props.task.task}
              </span>
            </div>
            <div className={`${style.task} mt-1`} style={{ fontSize: '11px' }}>
              <span>{moment.unix(props.task.schedule).format('DD-MM-YYYY')}</span>
            </div>
          </div>
          {!props.isArchived && <span className={style.taskItemSettings} onClick={openDropdown}><IoIosMore /></span>}
          {dropdown && <Dropdown
            closeDropdown={closeDropdown}
            dropdownItems={dropdownItems}
            left='98.5'
            top='' />
          }
        </li>}
      {modalDropdown && <ModalDropdown
        question={question}
        closeModal={closeModalDropdown}
        request={removeSelectedTask} />}
    </>
  )
};
