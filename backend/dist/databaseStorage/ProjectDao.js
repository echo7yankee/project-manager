"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = require("./DAO");
class ProjectDao extends DAO_1.DAO {
    constructor(client) {
        super(client);
        this.findAndUpdate = async (id, body) => {
            return await this.client.model.findOneAndUpdate({
                _id: id, $push: { projects: { body } }
            });
        };
        this.client = client;
    }
}
exports.ProjectDao = ProjectDao;
//# sourceMappingURL=ProjectDao.js.map