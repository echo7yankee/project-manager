"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Project {
    constructor(projectDao) {
        this.createProject = async (req, res) => {
            try {
                const id = req.query.userId;
                const body = req.body;
                const newProject = Object.assign({ userId: id }, body);
                const createdProject = await this.projectDao.add(newProject);
                console.log(createdProject);
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        };
        this.projectDao = projectDao;
    }
}
exports.Project = Project;
//# sourceMappingURL=project.js.map