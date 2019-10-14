import React, { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../../Redux/actions/task';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

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

    function editSelectedTask(e): void {
        e.preventDefault();

        const newTaskValue = {
            ...task,
            task: taskValueEdit
        }

        dispatch(updateTask(projectId, task.id, newTaskValue));
        setEditable();
        closeDropdown()
    }

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
                    <span className={style.task} onClick={setEditable}>{task.task}</span>
                    <span className={style.taskItemSettings} onClick={openDropdown}><IoIosMore /></span>
                    {dropdown && <Dropdown
                        setState={setEditable}
                        closeDropdown={closeDropdown}
                        openModalDropdown={openModalDropdown}
                        name='Task'
                        left='97.5' />
                    }
                </li>}
            {modalDropdown && <ModalDropdown
                question={question}
                closeModal={closeModalDropdown}
                request={removeSelectedTask} />}
        </>
    )
};