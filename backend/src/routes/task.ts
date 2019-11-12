import { Router } from 'express';

import { Task } from '../controllers/task';
import { taskDao } from '../databaseStorage/daos';

// Daos
export const taskRouter: Router = Router();
const task: Task = new Task(taskDao);

//projects
taskRouter.post('/task', task.createTask);
taskRouter.delete('/task/:id', task.removeTask);
taskRouter.put('/task/:id', task.editTask);
taskRouter.put('/tasks/archived', task.editAllTasks);
taskRouter.get('/task', task.getTasks);
taskRouter.get('/tasks', task.getAllTasks);
