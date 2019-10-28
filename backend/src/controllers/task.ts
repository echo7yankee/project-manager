
//ts types
import { TaskDao } from '../databaseStorage/TaskDao';
import { Request, Response } from 'express';
import { ITask, ITaskDatabase } from '../TSTypes/Task';

export class Task {
    private taskDao: TaskDao;
    constructor(taskDao: TaskDao) {
        this.taskDao = taskDao;
    }

    public createTask = async (req: Request, res: Response): Promise<Response> => {
        try {

            const unixDate = new Date(req.body.schedule).getTime() / 1000

            const projectId: string = req.query.projectId;
            const newTask: ITask = {
                ...req.body,
                schedule: unixDate,
                date: new Date(),
                projectId,
            };

            const tasks: ITaskDatabase[] = await this.taskDao.find({ projectId })

            const isSameTask: boolean = tasks.some((task: ITask) => {
                return task.task === newTask.task;
            })

            if (isSameTask) {
                return res.status(404).json({ error: 'This task exists already' })
            }

            const task: ITask = await this.taskDao.add(newTask);
            return res.status(200).json(task)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    public getTasks = async (req: Request, res: Response): Promise<Response> => {
        try {
            const projectId: string = req.query.projectId;

            const tasks: ITaskDatabase[] = await this.taskDao.find({ projectId })
            if (tasks === null) {
                return res.status(404).json({ error: "Tasks don't exist" })
            }

            const newTasks: ITask[] = tasks.map((task) => {
                return {
                    task: task.task,
                    projectId: projectId,
                    projectName: task.projectName,
                    archived: task.archived,
                    completed: task.completed,
                    date: task.date,
                    schedule: task.schedule,
                    id: task._id,
                };
            });

            return res.status(200).json(newTasks)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    public getAllTasks = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const tasks: ITaskDatabase[] = await this.taskDao.find({});

            if (tasks === null) {
                return res.status(404).json({ error: "Tasks don't exist" })
            }

            const newTasks = tasks.map((task) => {
                return {
                    task: task.task,
                    projectName: task.projectName,
                    projectId: task.projectId,
                    archived: task.archived,
                    completed: task.completed,
                    date: task.date,
                    schedule: task.schedule,
                    id: task._id,
                };
            });

            return res.status(200).json(newTasks)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    public editTask = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = req.params.id;

            const unixDate = new Date(req.body.schedule).getTime() / 1000

            const newUpdatedTask = {
                ...req.body,
                schedule: unixDate
            }

            const updatedTask = await this.taskDao.update(id, newUpdatedTask);
            if (updatedTask === null) {
                return res.status(404).json({ error: `Task with id ${id} does not exist` });
            }

            return res.status(200).json(updatedTask);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' })
        }
    }

    public removeTask = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id: string = req.params.id;

            const task: ITask = await this.taskDao.remove(id);

            if (task === null) {
                return res.status(404).json({ error: `Task with id ${id} does not exist` });
            }
            return res.status(200).json({ message: `Task with id ${id} has been removed` })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
}