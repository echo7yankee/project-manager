import { Router } from "express";
import { Project } from "../controllers/project";

// Daos
import { projectDao, userDao } from "../databaseStorage/daos";
export const projectRouter: Router = Router();

const project: Project = new Project(projectDao, userDao);

projectRouter.post("/project", project.createProject);
