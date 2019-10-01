export {};

const router = require("express").Router();
const { getUserRole } = require("../controllers/role");

router.get("/role/:id", getUserRole);

module.exports = router;
