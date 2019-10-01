"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const createToken = async (params) => {
    return await jwt.sign(params, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
        algorithm: "HS256"
    });
};
module.exports = { createToken };
//# sourceMappingURL=jwt.js.map