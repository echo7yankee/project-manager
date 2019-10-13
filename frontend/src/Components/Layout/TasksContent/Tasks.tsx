import React from 'react'

//style
import style from './tasks.module.css';

//redux
//import { useDispatch, useSelector } from 'react-redux';
//import { getTasks } from '../../../Redux/actions/task';

export const Tasks = () => {

    //redux
    // const tasks = useSelector(state => state.task.tasks);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getTasks(projectId));
    // }, [dispatch, projectId]);

    return (
        <div className={style.tasks}>
            tasks
        </div>
    )
}
