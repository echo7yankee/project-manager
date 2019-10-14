import React, { useState } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { removeTask } from '../../../Redux/actions/task';

//style
import { IoIosMore } from 'react-icons/io';
import style from './tasks.module.css';

//components
import { Dropdown } from '../../Dropdown/Dropdown';
import { ModalDropdown } from '../../modal/ModalDropdown';

export const Task = ({ task, projectId }) => {

    const [dropdown, setDropdown] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    //redux
    const dispatch = useDispatch();

    //dropdown toggle
    function openDropdown(): void {
        setDropdown(!dropdown);
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
    }

    function removeSelectedTask() {
        dispatch(removeTask(projectId, task.id))
    }

    console.log(isEditable);

    const question: string = `Are you sure you want to remove ${task.task}?`;

    return (
        <>
            <li className={style.taskItem}>
                <span className={style.task} onClick={setEditable}>{task.task}</span>
                <span className={style.taskItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <Dropdown
                    setState={setEditable}
                    closeDropdown={closeDropdown}
                    openModalDropdown={openModalDropdown}
                    name='Task'
                    left='97.5' />
                }
            </li>
            {modalDropdown && <ModalDropdown
                question={question}
                closeModal={closeModalDropdown}
                request={removeSelectedTask} />}
        </>
    )
};