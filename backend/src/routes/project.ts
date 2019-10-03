import { Router } from 'express';
import { Project, ProjectTask } from '../controllers/project';

// Daos
import { projectDao, userDao } from '../databaseStorage/daos';
export const projectRouter: Router = Router();

const project: Project = new Project(projectDao, userDao);
const projectTask: ProjectTask = new ProjectTask(projectDao);

//projects
projectRouter.post('/project', project.createProject);
//project-task
projectRouter.put('/project/task', projectTask.createProjectTask)