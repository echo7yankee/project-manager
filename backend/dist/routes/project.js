"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controllers/project");
const daos_1 = require("../databaseStorage/daos");
exports.projectRouter = express_1.Router();
const project = new project_1.Project(daos_1.projectDao, daos_1.userDao);
exports.projectRouter.post("/project", project.createProject);
//# sourceMappingURL=project.js.map