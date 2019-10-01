"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { getUser } = require("../controllers/user");
router.get("/:id", getUser);
module.exports = router;
//# sourceMappingURL=user.js.map