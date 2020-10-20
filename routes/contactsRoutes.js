const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

router
  .route("/")
  .get(contactsController.getAllContacts)
  .post(contactsController.addContact);

// router.route("/:name").get(contactsController.getContactByName);

module.exports = router;
