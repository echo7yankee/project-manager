"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(taskDao) {
        this.createTask = async (req, res) => {
            try {
                const unixDate = new Date(req.body.schedule).getTime() / 1000;
                const projectId = req.query.projectId;
                const newTask = Object.assign({}, req.body, { schedule: unixDate, date: new Date(), projectId });
                const tasks = await this.taskDao.find({ projectId });
                const isSameTask = tasks.some((task) => {
                    return task.task === newTask.task;
                });
                if (isSameTask) {
                    return res.status(404).json({ error: 'This task exists already' });
                }
                const task = await this.taskDao.add(newTask);
                return res.status(200).json(task);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getTasks = async (req, res) => {
            try {
                const projectId = req.query.projectId;
                const tasks = await this.taskDao.find({ projectId });
                if (tasks === null) {
                    return res.status(404).json({ error: "Tasks don't exist" });
                }
                const newTasks = tasks.map((task) => {
                    return {
                        task: task.task,
                        projectId: projectId,
                        projectName: task.projectName,
                        archived: task.archived,
                        completed: task.completed,
                        date: task.date,
                        schedule: task.schedule,
                        userId: task.userId,
                        id: task._id,
                    };
                });
                return res.status(200).json(newTasks);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getAllTasks = async (_req, res) => {
            try {
                const tasks = await this.taskDao.find({});
                if (tasks === null) {
                    return res.status(404).json({ error: "Tasks don't exist" });
                }
                const newTasks = tasks.map((task) => {
                    return {
                        task: task.task,
                        projectName: task.projectName,
                        projectId: task.projectId,
                        archived: task.archived,
                        completed: task.completed,
                        date: task.date,
                        userId: task.userId,
                        schedule: task.schedule,
                        id: task._id,
                    };
                });
                return res.status(200).json(newTasks);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editTask = async (req, res) => {
            try {
                const id = req.params.id;
                const unixDate = new Date(req.body.schedule).getTime() / 1000;
                const newUpdatedTask = Object.assign({}, req.body, { schedule: unixDate });
                const updatedTask = await this.taskDao.update(id, newUpdatedTask);
                if (updatedTask === null) {
                    return res.status(404).json({ error: `Task with id ${id} does not exist` });
                }
                return res.status(200).json(updatedTask);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editAllTasks = async (req, res) => {
            try {
                const { projectName } = req.query;
                const { isArchived } = req.query;
                const updatedTasks = await this.taskDao.updateAll(projectName, isArchived);
                return res.status(200).json(updatedTasks);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.removeTask = async (req, res) => {
            try {
                const id = req.params.id;
                const task = await this.taskDao.remove(id);
                if (task === null) {
                    return res.status(404).json({ error: `Task with id ${id} does not exist` });
                }
                return res.status(200).json({ message: `Task with id ${id} has been removed` });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.taskDao = taskDao;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map