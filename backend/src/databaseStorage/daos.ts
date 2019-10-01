export {};

const MongoClient = require("../databaseStorage/clients/MongoClient");

const UserDatabase = require("./UserDatabase");
const LocationDatabase = require("./LocationDatabase");
const RoleDatabase = require("./RoleDatabase");

const { User } = require("./schemas/models/User");
const { Location } = require("./schemas/models/Location");
const { Role } = require("./schemas/models/Role");

const userClient = new MongoClient(User);
const locationClient = new MongoClient(Location);
const roleClient = new MongoClient(Role);

module.exports = {
  userDao: new UserDatabase(userClient),
  locationDao: new LocationDatabase(locationClient),
  roleDao: new RoleDatabase(roleClient)
};
