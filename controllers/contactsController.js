const Contact = require("../models/Contact");

// Init an empty array. In real world we use DBs for storage
const contacts = [];

// Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    res.json({
      message: "success",
      contacts,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Add Contact
exports.addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body.name, req.body.phoneNumber);
    contacts.push(contact);
    res.json({
      message: "success",
      contact,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

// Get Contact By Name
exports.getContactByName = async (req, res) => {
  try {
    const filteredContacts = contacts.filter((c) => c.name === req.params.name);
    res.json({
      message: "success",
      contacts: filteredContacts,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
