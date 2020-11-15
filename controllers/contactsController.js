const Contact = require("../models/Contact");

// Init an empty array. In real world we use DBs for storage
const contacts = [new Contact("Jon", "12345")];

// Get All Contacts
exports.getAllContacts = async (req, res) => {
  try {
    res.status(200).json({
      message: "success",
      contacts,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Add Contact
exports.addContact = async (req, res) => {
  try {
    const contact = new Contact(req.body.name, req.body.phoneNumber);
    contacts.push(contact);
    res.status(201).json({
      message: "success",
      contact,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// Get Contact By Name
exports.getContactByName = async (req, res) => {
  try {
    const filteredContacts = contacts.filter((c) => c.name === req.params.name);
    if (filteredContacts.length === 0) {
      res.status(404).json({ message: "No contact matched the query" });
    }
    res.status(200).json({
      message: "success",
      contacts: filteredContacts,
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
