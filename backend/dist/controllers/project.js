"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(projectDao) {
        this.createProject = async (req, res) => {
            try {
                const id = req.query.userId;
                const body = req.body;
                const newProject = Object.assign({}, body, { userId: id });
                const project = await this.projectDao.add(newProject);
                return res.status(200).json(project);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.getProjects = async (req, res) => {
            try {
                const id = req.query.userId;
                const projects = await this.projectDao.find({ userId: id });
                return res.status(200).json(projects);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.projectDao = projectDao;
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