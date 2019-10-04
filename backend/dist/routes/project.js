"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controllers/project");
const daos_1 = require("../databaseStorage/daos");
exports.projectRouter = express_1.Router();
const project = new project_1.Project(daos_1.projectDao);
const projectTask = new project_1.ProjectTask(daos_1.projectDao);
exports.projectRouter.post('/project', project.createProject);
exports.projectRouter.get('/project', project.getProjects);
exports.projectRouter.delete('/project/:id', project.removeProject);
exports.projectRouter.put('/project/:id', project.updateProject);
exports.projectRouter.put('/project/task', projectTask.createProjectTask);
//# sourceMappingURL=project.js.map