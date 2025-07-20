//GEt all contacts
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  if (contacts.user_id !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized");
  }
  res.status(200).json({
    message: "Get all contacts",
    details: contacts,
  });
});

const createContacts = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json({
    message: "Create contacts",
    details: contact,
  });
});

const getContactById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({
    message: "Get details of a contact",
    contact,
  });
});

const updateContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Update the contact",
    updatedContact,
  });
});

const deleteContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const deletedContact = await Contact.findByIdAndDelete(id);
  res.status(200).json({
    message: "Delete the contact",
    deletedContact,
  });
});

module.exports = {
  getContacts,
  createContacts,
  getContactById,
  updateContactById,
  deleteContactById,
};
