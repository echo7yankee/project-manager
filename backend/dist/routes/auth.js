"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const daos_1 = require("../databaseStorage/daos");
exports.authRouter = express_1.Router();
const authenticate = new auth_1.Authenticate(daos_1.userDao);
exports.authRouter.post('/register', authenticate.createUser);
exports.authRouter.post('/login', authenticate.loginUser);
exports.authRouter.put('/update/:id', authenticate.updateUserDetails);
//# sourceMappingURL=auth.js.map