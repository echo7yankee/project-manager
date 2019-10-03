"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(projectDao, userDao) {
        this.createProject = async (req, res) => {
            try {
                const id = req.query.userId;
                const body = req.body;
                const updatedProject = await this.projectDao.findAndUpdate(id, body);
                if (updatedProject === null) {
                    const project = await this.projectDao.add(body);
                    const user = await this.userDao.findById(id);
                    const newUser = Object.assign({}, user, { projectId: project._id });
                    await this.userDao.update(id, newUser);
                    return res.status(200).json(project);
                }
                return res.status(200).json(updatedProject);
            }
            catch (error) {
                console.log(error);
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