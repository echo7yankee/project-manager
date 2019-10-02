"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.authRouter = express_1.Router();
const auth_1 = require("../controllers/auth");
const authenticate = new auth_1.Authenticate();
exports.authRouter.post('/register', authenticate.createUser);
exports.authRouter.post('/login', authenticate.loginUser);
//# sourceMappingURL=auth.js.map