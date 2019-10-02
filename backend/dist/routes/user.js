"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const daos_1 = require("../databaseStorage/daos");
const daos_2 = require("../databaseStorage/daos");
exports.userRouter = express_1.Router();
const user = new user_1.User(daos_1.userDao, daos_2.roleDao);
exports.userRouter.get('/:id', user.getUserDetails);
//# sourceMappingURL=user.js.map