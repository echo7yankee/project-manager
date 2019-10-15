"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controllers/task");
const daos_1 = require("../databaseStorage/daos");
exports.taskRouter = express_1.Router();
const task = new task_1.Task(daos_1.taskDao);
exports.taskRouter.post('/task', task.createTask);
exports.taskRouter.delete('/task/:id', task.removeTask);
exports.taskRouter.put('/task/:id', task.editTask);
exports.taskRouter.get('/task', task.getTasks);
exports.taskRouter.get('/tasks', task.getAllTasks);
//# sourceMappingURL=task.js.map