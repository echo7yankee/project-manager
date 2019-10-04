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
        this.removeProject = async (req, res) => {
            try {
                const id = req.params.id;
                const project = await this.projectDao.remove(id);
                if (project === null) {
                    return res.status(404).json({ error: `Project with id ${id} does not exist` });
                }
                return res.status(200).json({ message: `Project with id ${id} has been removed from the collection` });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.updateProject = async (req, res) => {
            try {
                const id = req.params.id;
                const body = req.body;
                const updatedProject = await this.projectDao.update(id, body);
                if (updatedProject === null) {
                    return res.status(404).json({ error: `Project with id ${id} does not exist` });
                }
                return res.status(200).json(updatedProject);
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
//# sourceMappingURL=project.js.map