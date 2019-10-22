import React, { useState } from 'react';

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

export const Task = ({ task, projectId }) => {

    const [dropdown, setDropdown] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [taskValueEdit, setTaskValueEdit] = useState(task.task);
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
        closeDropdown()
    }

    function handleChange(e) {
        setTaskValueEdit(e.target.value);
    }

    function removeSelectedTask(): void {
        dispatch(removeTask(projectId, task.id));
    }

    function setCompletedTask(id): void {
        if (task.id === id) {
            task = {
                ...task,
                completed: true,
            }
            console.log(task)
            dispatch(updateTask(projectId, task.id, task));
        }
    }

    function editSelectedTask(e): void {
        e.preventDefault();

        const newTaskValue = {
            ...task,
            task: taskValueEdit,
        }

        dispatch(updateTask(projectId, task.id, newTaskValue));
        setEditable();
        closeDropdown();
    }

    const createIcon = <IoMdCreate />;
    const trash = <IoIosTrash />;

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
    },]

    const question: string = `Are you sure you want to remove ${task.task}?`;

    return (
        <>
            {isEditable ? <TaskForm
                buttonDo='Add Task'
                buttonClose='Cancel'
                onClickClose={setEditable}
                onChange={handleChange}
                inputValue={taskValueEdit}
                request={editSelectedTask} /> : <li className={style.taskItem}>

                    <div className='dflex'>
                        <span className={style.taskDot} onClick={() => setCompletedTask(task.id)} ></span>
                        <span className={style.task} onClick={setEditable}>{task.task}</span>
                    </div>
                    <span className={style.taskItemSettings} onClick={openDropdown}><IoIosMore /></span>
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