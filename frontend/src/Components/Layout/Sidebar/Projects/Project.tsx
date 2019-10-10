import React, { useState } from 'react';

//style
import style from './project.module.css';
import { IoIosMore } from 'react-icons/io';

//redux
import { useDispatch } from 'react-redux';
import { removeProject } from '../../../../Redux/actions/project';

//Components
import { ModalDropdown } from '../modal/ModalDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export const Project = ({ project, userId }): JSX.Element => {
    const [dropdown, setDropdown] = useState(false);
    const [modal, setModal] = useState(false);

    //redux
    const dispatch = useDispatch();

    function openDropdown() {
        setDropdown(!dropdown);
    }

    function closeDropdown() {
        setDropdown(false)
    }

    function openModal(): void {
        setModal(!modal);
        closeDropdown();
    }

    function closeModal(): void {
        setModal(false);
    }

    const question = `Are you sure you want to remove ${project.name}?`

    function removeSelectedProject(): void {
        dispatch(removeProject(userId, project.id));
    }

    return (
        <>
            <ul className={style.projectItems}>
                <li className={style.projectItem} >
                    <div>
                        <span className='dot'></span>
                        <span>{project.name}</span>
                    </div>
                    <span className={style.projectItemSettings} onClick={openDropdown}><IoIosMore /></span>
                    {dropdown && <ProjectDropdown closeDropdown={closeDropdown} openModal={openModal} />}
                </li>
            </ul>
            {modal && <ModalDropdown question={question} closeModal={closeModal} request={removeSelectedProject} />}
        </>
    )
};