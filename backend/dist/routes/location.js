"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const { getUserLocation } = require("../controllers/location");
router.get("/location/:id", getUserLocation);
module.exports = router;
//# sourceMappingURL=location.js.map