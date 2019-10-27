import React, { useState, useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, addProject } from '../../../../Redux/actions/project';
import { Project } from './Project';

//style
import { IoIosArrowDown, IoMdAdd } from 'react-icons/io';
import spinner from '../../../../assets/gifs/spinner.gif';
import style from './project.module.css';

//components
import { Modal } from '../../../modal/Modal';
import { ProjectCreator } from './ProjectCreator';
import { IProjectsType } from '../../../../TSTypes/reducers/project';


export interface IProjects {
  userId: string;
  history;
}

export const Projects = (props: IProjects): JSX.Element | null => {
  const [modal, setModal] = useState(false);
  const [toggleProjects, setToggleProjects] = useState(true);
  const [projectValue, setProjectValue] = useState('');
  //redux
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);
  const isLoading = useSelector(state => state.project.isLoading);

  useEffect(() => {
    dispatch(getProjects(props.userId));
  }, [dispatch, props.userId]);

  function openModal(): void {
    setModal(!modal);
  }

  function closeModal(): void {
    setModal(!modal);
  }

  function onChange(e) {
    setProjectValue(e.target.value);
  }

  function addNewProject(e) {
    e.preventDefault();
    const newProject = {
      name: projectValue,
      archived: false,
    }
    dispatch(addProject(newProject, props.userId))
    setProjectValue('');
    setModal(!modal);
  }

  const unarchivedProjects: IProjectsType[] = projects && projects.filter(project => {
    return project.archived === false;
  });

  return <div>
    {projects.length > 0 ? <div>
      <div className={style.projectsTitle}>
        <div onClick={() => setToggleProjects(!toggleProjects)}>
          <span className={`${style.projectsTitleIcon} mr-1`}>
            <IoIosArrowDown className={toggleProjects ? 'rotate-0' : 'rotate-90'} />
          </span>
          <span>Projects</span>
        </div>
        <div>
          <span className={style.projectsTitleIcon} onClick={openModal}><IoMdAdd /></span>
        </div>
      </div>

      {unarchivedProjects.map(project => {
        return <div key={project.id} className={toggleProjects ? style.projectShow : style.projectHide}>
          <ul>
            <Project
              project={project}
              userId={props.userId}
              history={props.history}
              areArchivedProjects={false}
              isArchived={false}
            />
          </ul>
        </div>
      })}

    </div> : null}
    <ProjectCreator onClick={openModal} />

    {modal && <Modal
      inputValue={projectValue}
      onChange={onChange}
      title='Add project'
      labelName='Project name'
      closeModal={closeModal}
      request={addNewProject} />}

    {isLoading && <div className='overlay'>
      <img src={spinner} alt='spinner' />
    </div>}
  </div>
};
