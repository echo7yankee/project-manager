
export class MongoClient {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  // tslint:disable-next-line: no-any
  public async find(params) {
    try {
      const items = await this.model.find(params);
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  public async findById(id: string) {
    try {
      const item = await this.model.findById(id);
      return item;
    } catch (error) {
      console.log(error);
    }
  }

  public async findOne(params) {
    try {
      const item = await this.model.findOne(params);
      return item;
    } catch (error) {
      console.log(error);
    }
  }

  public async create(item) {
    try {
      const newItem = new this.model({ ...item });
      const createdItem = await newItem.save();

      return createdItem;
    } catch (error) {
      console.log(error);
    }
  }

  public async remove(id: string) {
    try {
      const removedItem = await this.model.findOneAndDelete(id);
      return removedItem;
    } catch (error) {
      console.log(error);
    }
  }

  public async update(id: string, updatedAttributes) {
    try {
      const item = await this.model.findById(id);
      Object.keys(updatedAttributes).forEach(key => {
        item[key] = updatedAttributes[key];
      });

      const updatedItem = await item.save();

      return updatedItem;
    } catch (error) {
      console.log(error);
    }
  }
};
