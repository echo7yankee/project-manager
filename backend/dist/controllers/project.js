"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(projectDao, taskDao) {
        this.createProject = async (req, res) => {
            try {
                const id = req.query.userId;
                const body = req.body;
                const newProject = Object.assign({}, body, { userId: id });
                const projects = await this.projectDao.find({ userId: id });
                const isSameProject = projects.some((project) => {
                    return project.name === newProject.name;
                });
                if (isSameProject) {
                    return res.status(404).json({ error: "This project already exists" });
                }
                const project = await this.projectDao.add(newProject);
                return res.status(200).json(project);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong" });
            }
        };
        this.getProjects = async (req, res) => {
            try {
                const id = req.query.userId;
                const projects = await this.projectDao.find({
                    userId: id,
                });
                if (projects === null) {
                    return res.status(404).json({ error: "Projects don't exist" });
                }
                const newProjects = projects.map(project => {
                    return {
                        name: project.name,
                        userId: project.userId,
                        archived: project.archived,
                        id: project._id
                    };
                });
                return res.status(200).json(newProjects);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong" });
            }
        };
        this.updateProject = async (req, res) => {
            try {
                const id = req.params.id;
                const body = req.body;
                const updatedProject = await this.projectDao.update(id, body);
                if (updatedProject === null) {
                    return res
                        .status(404)
                        .json({ error: `Project with id ${id} does not exist` });
                }
                return res.status(200).json(updatedProject);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.removeProject = async (req, res) => {
            try {
                const id = req.params.id;
                const project = await this.projectDao.remove(id);
                if (project === null) {
                    return res
                        .status(404)
                        .json({ error: `Project with id ${id} does not exist` });
                }
                await this.taskDao.removeAll({ projectId: id });
                return res.status(200).json({
                    message: `Project with id ${id} has been removed from the collection`
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong" });
            }
        };
        this.projectDao = projectDao;
        this.taskDao = taskDao;
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map