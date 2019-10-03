"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(projectDao, userDao) {
        this.createProject = async (req, res) => {
            try {
                const id = req.query.userId;
                const body = req.body;
                const newProject = Object.assign({ userId: id }, body);
                const createdProject = await this.projectDao.add(newProject);
                const user = await this.userDao.findById(id);
                const newUser = Object.assign({}, user._doc, { projectId: [createdProject._id] });
                console.log('what is wrong with newuser?', newUser);
                await this.userDao.update(id, newUser);
                return res.status(201).json(createdProject);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.removeProject = async (req, res) => {
            try {
                const id = req.params.projectId;
                await this.projectDao.remove(id);
                return res.status(200).json({ message: `Product with the id ${id} has been removed from collection` });
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.editProject = async (req, res) => {
            try {
                console.log(req.body);
                const id = req.params.projectId;
                const editedProject = await this.projectDao.update(id, req.body);
                return res.status(200).json(editedProject);
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getProjects = async (_req, res) => {
            try {
                const projects = await this.projectDao.find({});
                return res.status(200).json(projects);
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.projectDao = projectDao;
        this.userDao = userDao;
    }
}
exports.Project = Project;
class ProjectTask {
    constructor(projectDao) {
        this.createProjectTask = async (req, res) => {
            try {
                const { userId } = req.query;
                const project = await this.projectDao.findById(userId);
                const newProjectTasks = Object.assign({}, req.body, { projectId: project._id });
                console.log('PROJECT TASKS', newProjectTasks);
                const updatedProject = Object.assign({}, project, { projectTasks: [...project.projectTasks, req.body] });
                console.log('Updated projects', updatedProject);
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.projectDao = projectDao;
    }
}
exports.ProjectTask = ProjectTask;
//# sourceMappingURL=project.js.map