module.exports = class DAO {
  client: any;
  constructor(client: any) {
    this.client = client;
  }

  async find(params: any) {
    return await this.client.find(params);
  }

  async findById(id: string) {
    return await this.client.findById(id);
  }

  async findOne(params: any) {
    return await this.client.findOne(params);
  }

  async add(item: object) {
    return await this.client.create(item);
  }

  async remove(id: string) {
    return await this.client.remove(id);
  }

  async update(id, item) {
    return await this.client.update(id, item);
  }
};
