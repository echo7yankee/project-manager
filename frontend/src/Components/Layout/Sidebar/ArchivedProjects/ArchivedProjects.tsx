import React,{useState} from 'react';

//style
import style from '../Projects/project.module.css';

//redux
import { useSelector } from 'react-redux';

//ts types
import { IProjectsType } from '../../../../TSTypes/reducers/project';
import { IProjects } from '../Projects/Projects';

//components
import { Project } from '../Projects/Project';

export const ArchivedProjects = (props:IProjects) => {

    //redux
    const [toggleArchivedProjects,setToggleArchivedProjects] = useState<boolean>(false);
    const projects:IProjectsType[] = useSelector(state => state.project.projects);

    const archivedProjects:IProjectsType[] = projects && projects.filter(projects => {
        return projects.archived === true;
    });

    return archivedProjects.length > 0 ?   <div className={style.archivedProjectsContainer}>
    <div>
        <h3 onClick={() => setToggleArchivedProjects(!toggleArchivedProjects)}>
        {toggleArchivedProjects ? 'Hide archive' : 'Archived projects' }
        </h3>
        </div>
        <div className={toggleArchivedProjects ? style.projectShow : style.projectHide}>
        <ul>{archivedProjects.map(project => {
            return <Project 
            key={project.id}
            project={project}
            history={props.history}
            userId={props.userId} 
            areArchivedProjects={true}
            isArchived={true} />
            })}</ul>
        </div>
    </div>:null;
};