import React, { useState } from 'react';

//style
import { IoIosMore } from 'react-icons/io';
import style from './project.module.css';

//redux
import { useDispatch } from 'react-redux';
import { removeProject, editProject } from '../../../../Redux/actions/project';

//react router dom
import { Link } from 'react-router-dom';

//Components
import { Modal } from '../modal/Modal';
import { ModalDropdown } from '../modal/ModalDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export const Project = ({ project, userId }): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [projectValueEdit, setProjectValueEdit] = useState(project.name);

    //redux
    const dispatch = useDispatch();

    //DROPDOWN TOGGLE
    function openDropdown() {
        setDropdown(!dropdown);
    }

    function closeDropdown() {
        setDropdown(false)
    }

    //MODAL TOGGLE
    function openModal() {
        setModal(!modal);
    }

    function closeModal() {
        setModal(false)
    }

    //MODAL FROM DROPDOWN TOGGLE
    function openModalDropdown(): void {
        setModalDropdown(!modalDropdown);
        closeDropdown();
    }

    function closeModalDropdown(): void {
        setModalDropdown(false);
    }

    function onChange(e: { target: { value: string; }; }) {
        setProjectValueEdit(e.target.value);
    }

    function removeSelectedProject(): void {
        dispatch(removeProject(userId, project.id));
    }

    function editSelectedProject(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        dispatch(editProject(userId, project.id, projectValueEdit));
        setModal(false);
    }

    const question: string = `Are you sure you want to remove ${project.name}?`

    return (
        <>
            <Link className={style.projectItem} to={`/task/${project.id}/search?q=${project.name}`} >
                <div>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </div>
                <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <ProjectDropdown
                    closeDropdown={closeDropdown}
                    openModal={openModal}
                    openModalDropdown={openModalDropdown} />}
            </Link>

            {modalDropdown && <ModalDropdown question={question} closeModal={closeModalDropdown} request={removeSelectedProject} />}
            {modal && <Modal
                onChange={onChange}
                closeModal={closeModal}
                inputValue={projectValueEdit}
                labelName='Project name'
                title='Edit project'
                request={editSelectedProject} />}
        </>
    )
};
