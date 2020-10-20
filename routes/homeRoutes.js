const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Get welcome message
router.route("/").get(homeController.getWelcomeMessage);

module.exports = router;
