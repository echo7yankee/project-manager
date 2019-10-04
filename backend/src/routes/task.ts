import { Router } from 'express';

import { Task } from '../controllers/task';

// Daos
import { taskDao } from '../databaseStorage/daos';
export const taskRouter: Router = Router();
const task: Task = new Task(taskDao);

//projects
taskRouter.post('/task', task.createTask);
taskRouter.delete('/task/:id', task.removeTask);
taskRouter.put('/task/:id', task.editTask);
taskRouter.get('/task', task.getTasks);
