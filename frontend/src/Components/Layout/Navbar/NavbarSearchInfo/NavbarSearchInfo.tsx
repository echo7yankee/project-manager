import React, { useEffect } from 'react';

//react router dom
import { Link } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { getAllTasks } from '../../../../Redux/actions/task';
//
import style from './navbarSearchInfo.module.css';

export const NavbarSearchInfo = ({ onClick, inputValue }): JSX.Element => {

    const allTasks = useSelector(state => state.task.allTasks);
    const projects = useSelector(state => state.project.projects);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])

    function filter(allTasks) {
        return allTasks.filter(task => {
            return task.task.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
        })
    }
    console.log(projects);

    return (
        <div className={style.searchInfo}>
            <ul className={style.searchList}>
                {allTasks.length > 0 ?
                    filter(allTasks).map(task => {
                        return <Link key={task.id}
                            className={style.searchItem}
                            onClick={onClick}
                            to={`/project/${task.projectId}?q=${task.projectName}`}>
                            <span className='dot mr-1'></span>
                            <span>{task.task}</span>
                        </Link>
                    })
                    : null}
            </ul>
        </div>
    )
};