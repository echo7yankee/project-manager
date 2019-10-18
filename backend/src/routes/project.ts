import { Router } from 'express';
import { Project } from '../controllers/project';

// Daos
import { projectDao, taskDao } from '../databaseStorage/daos';
export const projectRouter: Router = Router();

const project: Project = new Project(projectDao, taskDao);

//projects
projectRouter.post('/project', project.createProject);
projectRouter.get('/project', project.getProjects)
projectRouter.delete('/project/:id', project.removeProject)
projectRouter.put('/project/:id', project.updateProject)
