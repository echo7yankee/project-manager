import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../../Redux/actions/project";
import { Project } from "./Project";

//style
import { IoMdAdd } from 'react-icons/io';
import style from './project.module.css';

interface IProjects {
  userId: string;
}

export const Projects = (props: IProjects): JSX.Element | null => {
  //redux
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);

  useEffect(() => {
    dispatch(getProjects(props.userId));
  }, [dispatch, props.userId]);

  return projects.length > 0 ? <div>
    {projects.map(project => {
      return <Project key={project.id} project={project} />
    })}
    <div className={style.addProjectContainer}>
      <span><IoMdAdd /></span>
      <button>Add project</button>
    </div>
  </div> : null
};
