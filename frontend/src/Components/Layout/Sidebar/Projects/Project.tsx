import React, { useState } from 'react';

//style
import style from './project.module.css';
import { IoIosMore } from 'react-icons/io';

//redux
import { useDispatch } from 'react-redux';
import { removeProject, editProject } from '../../../../Redux/actions/project';

//Components
import { ModalDropdown } from '../modal/ModalDropdown';
import { ProjectDropdown } from './ProjectDropdown';
import { Modal } from '../modal/Modal';
import { Tasks } from '../../TasksContent/Tasks';

export const Project = ({ project, userId }): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [projectValueEdit, setProjectValueEdit] = useState(project.name);
    const [toggleTasks, setToggleTasks] = useState(false)

    //redux
    const dispatch = useDispatch();

    function openDropdown() {
        setDropdown(!dropdown);
    }

    function closeDropdown() {
        setDropdown(false)
    }

    function openModal() {
        setModal(!modal);
    }

    function closeModal() {
        setModal(false)
    }

    function openModalDropdown(): void {
        setModalDropdown(!modalDropdown);
        closeDropdown();
    }

    function closeModalDropdown(): void {
        setModalDropdown(false);
    }

    function onChange(e) {
        setProjectValueEdit(e.target.value);
    }

    function removeSelectedProject(): void {
        dispatch(removeProject(userId, project.id));
    }

    function editSelectedProject(e): void {
        e.preventDefault();
        dispatch(editProject(userId, project.id, projectValueEdit));
        setModal(false);
    }
    console.log(toggleTasks);
    console.log(setToggleTasks);


    const question = `Are you sure you want to remove ${project.name}?`

    return (
        <>
            <li className={style.projectItem} onClick={() => setToggleTasks(true)} >
                <div>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </div>
                <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <ProjectDropdown closeDropdown={closeDropdown} openModal={openModal} openModalDropdown={openModalDropdown} />}
            </li>

            {modalDropdown && <ModalDropdown question={question} closeModal={closeModalDropdown} request={removeSelectedProject} />}
            {modal && <Modal
                onChange={onChange}
                closeModal={closeModal}
                inputValue={projectValueEdit}
                labelName='Project name'
                title='Edit project'
                request={editSelectedProject} />}
            {/* {toggleTasks && <Tasks />} */}
        </>
    )
};
