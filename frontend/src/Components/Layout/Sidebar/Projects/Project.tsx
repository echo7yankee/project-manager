import React, { useState } from 'react';

//style
import { IoIosMore } from 'react-icons/io';
import style from './project.module.css';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { removeProject, editProject } from '../../../../Redux/actions/project';
import { updateTask } from '../../../../Redux/actions/task';

//react router dom
import { Link } from 'react-router-dom';

//style
import { IoIosTrash, IoMdCreate, IoIosArchive } from 'react-icons/io';

//Components
import { Dropdown } from '../../../Dropdown/Dropdown';
import { Modal } from '../../../modal/Modal';
import { ModalDropdown } from '../../../modal/ModalDropdown';

export const Project = ({ project, userId, history, areArchivedProjects, isArchived }): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDropdown, setModalDropdown] = useState(false);
    const [projectValueEdit, setProjectValueEdit] = useState(project.name);

    //redux
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task.tasks);

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
        history.push('/')
    }

    function editSelectedProject(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        const newProject = {
            name: projectValueEdit,
            archived: false
        }
        dispatch(editProject(userId, project.id, newProject));
        setModal(false);
    }

    function setProjectArchived() {

        tasks.map(task => {
            const newTask = {
                ...task,
                archived: true
            }
            dispatch(updateTask(project.id, task.id, newTask))
            return task;
        })

        project = {
            ...project,
            archived: true,
        }
        dispatch(editProject(userId, project.id, project));
        setDropdown(false);
    }

    function setProjectUnarchived() {

        tasks.map(task => {
            const newTask = {
                ...task,
                archived: false
            }
            dispatch(updateTask(project.id, task.id, newTask))
            return task;
        })

        project = {
            ...project,
            archived: false
        };
        dispatch(editProject(userId, project.id, project));
        setDropdown(false);
    }

    const editIcon = <IoMdCreate />;
    const archiveIcon = <IoIosArchive />;
    const removeIcon = <IoIosTrash />;

    const dropdownItemsUnarchived = [{
        name: 'Edit project',
        action: openModal,
        icon: editIcon,
    },
    {
        name: 'Archive project',
        action: () => setProjectArchived(),
        icon: archiveIcon,
    },
    {
        name: 'Remove project',
        action: openModalDropdown,
        icon: removeIcon,
    }
    ]


    const dropdownItemsArchived = [{
        name: 'Unarchive project',
        action: () => setProjectUnarchived(),
        icon: archiveIcon,
    },
    {
        name: 'Remove project',
        action: openModalDropdown,
        icon: removeIcon,
    }]


    const question: string = `Are you sure you want to remove ${project.name}?`;

    return (
        <>
            <li className={style.projectItem} >
                <Link to={{ pathname: `/project/${project.id}`, search: project.name, state: isArchived }}>
                    <span className='dot'></span>
                    <span>{project.name}</span>
                </Link>
                <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                {dropdown && <Dropdown
                    closeDropdown={closeDropdown}
                    dropdownItems={areArchivedProjects ? dropdownItemsArchived : dropdownItemsUnarchived}
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
