import React from 'react';

//redux
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

    return (
        <div className={style.searchInfo}>
            <ul className={style.searchList}>
                {tasks.length > 0 ?
                    filter(tasks).map(task => {
                        return <Link key={task.id} className={style.searchItem} to={`/project/${task.projectId}?q=${task.projectName}`}>
                            <span className='dot mr-1'></span>
                            <span>{task.task}</span>
                        </Link>
                    })
                    : null}
            </ul>
        </div>
    )
};