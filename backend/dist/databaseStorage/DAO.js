module.exports = class DAO {
    constructor(client) {
        this.client = client;
    }
    async find(params) {
        return await this.client.find(params);
    }
    async findById(id) {
        return await this.client.findById(id);
    }
    async findOne(params) {
        return await this.client.findOne(params);
    }
    async add(item) {
        return await this.client.create(item);
    }
    async remove(id) {
        return await this.client.remove(id);
    }
    async update(id, item) {
        return await this.client.update(id, item);
    }
};
//# sourceMappingURL=DAO.js.map