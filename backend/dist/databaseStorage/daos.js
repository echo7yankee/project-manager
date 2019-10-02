"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient_1 = require("../databaseStorage/clients/MongoClient");
const Role_1 = require("./models/Role");
const User_1 = require("./models/User");
const Project_1 = require("./models/Project");
const RoleDao_1 = require("./RoleDao");
const UserDao_1 = require("./UserDao");
const ProjectDao_1 = require("./ProjectDao");
const userClient = new MongoClient_1.MongoClient(User_1.User);
const roleClient = new MongoClient_1.MongoClient(Role_1.Role);
const projectClient = new MongoClient_1.MongoClient(Project_1.Project);
exports.userDao = new UserDao_1.UserDao(userClient);
exports.roleDao = new RoleDao_1.RoleDao(roleClient);
exports.projectDao = new ProjectDao_1.ProjectDao(projectClient);
//# sourceMappingURL=daos.js.map