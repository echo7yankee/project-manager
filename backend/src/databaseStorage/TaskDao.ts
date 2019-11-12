
import { DAO } from './DAO';

export class TaskDao extends DAO {
    public async updateAll(projectName: string, isArchived: boolean) {
        try {
            const items = await this.client.model.updateMany(
                { projectName: projectName },
                { $set: { archived: isArchived } }, { multi: true }
            );
            return items;
        } catch (error) {
            console.log(error);
        }
    }
}
