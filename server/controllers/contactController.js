import Contact from "../models/contact.js";

// GET all contacts
export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

// POST create new contact
export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update contact by ID
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE contact by ID
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
