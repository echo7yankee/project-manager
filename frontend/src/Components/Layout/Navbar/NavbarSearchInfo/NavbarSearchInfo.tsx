import React, { useEffect } from 'react';

//react router dom
import { Link } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';

import { getAllTasks } from '../../../../Redux/actions/task';
//
import style from './navbarSearchInfo.module.css';

interface INavbarSearchInfo {
    destroy: () => void;
    cursor: number;
    filter;
    allTasks;
    setRef;
}

export const NavbarSearchInfo = ((props: INavbarSearchInfo): JSX.Element => {

    const projects = useSelector(state => state.project.projects);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch])

    console.log(projects);

    return (
        <div className={style.searchInfo}>
            <ul className={style.searchList}>
                {props.allTasks.length > 0 ?
                    props.filter(props.allTasks).map((task, index) => {
                        return <Link
                            key={task.id}
                            ref={(ref) => props.setRef(ref, index)}
                            className={style.searchItem}
                            tabIndex={index}
                            onClick={props.destroy}
                            to={{
                                pathname: `/project/${task.projectId}`,
                                search: task.projectName,
                                state: task.archived,
                            }}
                        >
                            <span className='dot mr-1'></span>
                            <span>{task.task}</span>
                        </Link>;
                    })
                    : null}
            </ul>
        </div>
    )
});