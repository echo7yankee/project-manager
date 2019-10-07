import React, { useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '../../../../Redux/actions/project';

interface IProjects {
    userId: string
}

export const Projects = (props: IProjects): JSX.Element => {

    //redux
    const dispatch = useDispatch();
    const projects = useSelector(state => state.project.projects);
    const project = new Project();

    useEffect(() => {
        dispatch(project.getProjects(props.userId))
    }, [dispatch, project, props.userId])

    console.log(projects);

    return (
        <div>
            Projects
        </div>
    )
};
