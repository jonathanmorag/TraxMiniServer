const Contact = require("../models/Contact");

const contacts = [];

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
