export {};

const router = require("express").Router();
const { getUserLocation } = require("../controllers/location");

router.get("/location/:id", getUserLocation);

module.exports = router;
