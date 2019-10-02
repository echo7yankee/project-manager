"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient_1 = require("../databaseStorage/clients/MongoClient");
const User_1 = require("./models/User");
const UserDao_1 = require("./UserDao");
const userClient = new MongoClient_1.MongoClient(User_1.User);
exports.userDao = new UserDao_1.UserDao(userClient);
//# sourceMappingURL=daos.js.map