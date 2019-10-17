import React, { useState } from 'react';

//style
import { IoIosMore } from 'react-icons/io';
import style from './project.module.css';

//redux
import { useDispatch } from 'react-redux';
import { removeProject, editProject } from '../../../../Redux/actions/project';

//react router dom
import { Link } from 'react-router-dom';

//style
import { IoIosTrash, IoMdCreate } from 'react-icons/io';

//Components
import { Dropdown } from '../../../Dropdown/Dropdown';
import { Modal } from '../../../modal/Modal';
import { ModalDropdown } from '../../../modal/ModalDropdown';

export const Project = ({ project, userId }): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [projectValueEdit, setProjectValueEdit] = useState(project.name);

    //redux
    const dispatch = useDispatch();

    //DROPDOWN TOGGLE
    function openDropdown() {
        setDropdown(true);
    }

    function closeDropdown() {
        setDropdown(false)
    }

    //MODAL TOGGLE
    function openModal() {
        setModal(true);
    }

    function closeModal() {
        setModal(false)
    }

    //MODAL FROM DROPDOWN TOGGLE
    function openModalDropdown(): void {
        setModalDropdown(true);
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

    const createIcon = <IoMdCreate />
    const trash = <IoIosTrash />

    const dropdownItems = [{
        name: 'Edit Project',
        action: openModal,
        className: '',
        icon: createIcon,
    },
    {
        name: 'Remove Project',
        action: openModalDropdown,
        className: 'dropdown__remove',
        icon: trash
    },]

    const question: string = `Are you sure you want to remove ${project.name}?`

    return (
        <>
            <li className={style.projectItem} >
                <Link className='test' to={`/project/${project.id}?q=${project.name}`}>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </Link>
                <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <Dropdown
                    closeDropdown={closeDropdown}
                    dropdownItems={dropdownItems}
                    left='97.5'
                    top='70'
                />}
            </li>

            {modalDropdown && <ModalDropdown
                question={question}
                closeModal={closeModalDropdown}
                request={removeSelectedProject}
            />}
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
