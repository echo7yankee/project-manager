import React from 'react';

//redux
import { useSelector } from 'react-redux';
//
import style from './navbarSearchInfo.module.css';

export const NavbarSearchInfo = ({ inputValue }): JSX.Element => {

    const tasks = useSelector(state => state.task.tasks);
    const projects = useSelector(state => state.project.projects);

    function filter(tasks) {
        return tasks.filter(task => {
            return task.task.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        })
    }

    console.log(tasks);
    console.log(projects);
    console.log(inputValue);
    console.log(filter(tasks));

    return (
        <div className={style.searchInfo}>
            <ul className={style.searchList}>
                {tasks.length > 0 ?
                    filter(tasks).map(task => {
                        return <li>{task.task}</li>
                    })
                    : null}
            </ul>
        </div>
    )
};