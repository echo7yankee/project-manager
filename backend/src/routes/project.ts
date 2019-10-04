import { Router } from 'express';
import { Project, ProjectTask } from '../controllers/project';

// Daos
import { projectDao } from '../databaseStorage/daos';
export const projectRouter: Router = Router();

const project: Project = new Project(projectDao);
const projectTask: ProjectTask = new ProjectTask(projectDao);

// ADD REMOVE AND EDIT ROUTES

//projects
projectRouter.post('/project', project.createProject);
projectRouter.get('/project', project.getProjects)
projectRouter.delete('/project/:id', project.removeProject)
projectRouter.put('/project/:id', project.updateProject)
//project-task
projectRouter.put('/project/task', projectTask.createProjectTask)