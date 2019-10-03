
import { DAO } from './DAO';

export class ProjectDao extends DAO {
    constructor(client) {
        super(client)
        this.client = client
    }

    public findAndUpdate = async (id, body) => {
        return await this.client.model.findOneAndUpdate({
            _id: id, $push: { projects: { body } }
        })
    }
}
