"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daos_1 = require("../databaseStorage/daos");
exports.projectRouter = express_1.Router();
const project = new Project(daos_1.projectDao);
exports.projectRouter.post('/project', project.createProject);
//# sourceMappingURL=project.js.map