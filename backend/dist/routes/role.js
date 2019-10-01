"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { getUserRole } = require("../controllers/role");
router.get("/role/:id", getUserRole);
module.exports = router;
//# sourceMappingURL=role.js.map