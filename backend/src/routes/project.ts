
import { Router } from 'express';
import { projectDao } from '../databaseStorage/daos';

export const projectRouter: Router = Router();

const project: Project = new Project(projectDao);

projectRouter.post('/project', project.createProject);
