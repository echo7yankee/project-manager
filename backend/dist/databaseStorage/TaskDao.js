"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = require("./DAO");
class TaskDao extends DAO_1.DAO {
    async updateAll(projectName, isArchived) {
        try {
            const items = await this.client.model.updateMany({ projectName: projectName }, { $set: { archived: isArchived } }, { multi: true });
            return items;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.TaskDao = TaskDao;
//# sourceMappingURL=TaskDao.js.map