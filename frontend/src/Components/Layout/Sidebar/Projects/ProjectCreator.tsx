import React from 'react'

//style 
import { IoMdAdd } from 'react-icons/io';
import style from './project.module.css';

export const ProjectCreator = ({ onClick }): JSX.Element => {
    return (
        <div className={style.addProjectContainer} onClick={onClick}>
            <span><IoMdAdd /></span>
            <button>Add project</button>
        </div>
    )
};
