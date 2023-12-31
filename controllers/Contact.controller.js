const mongoose = require("mongoose");

const Contact = mongoose.model("Contact");

const createContact = async (req, res) => {
  const { name, email, message } = req.body;
 
  try {
    const contactDocument = new Contact({
        name,
        email,
        message,
    });
    const response = await contactDocument.save();

    return res.status(201).json({
      message: "Contact created successfully",
      contact: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}

const getAllContacts = async (req, res) => {
  try {
    const response = await Contact.find();
    return res.status(200).json({
      message: "Ok",
      detail: response,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (contact) {
      return res.status(200).json({
        message: "Contact deleted successfully",
        contact,
      });
    }
    return res.status(404).json({
      message: "Contact not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

module.exports = {
    createContact,
    getAllContacts,
  
  deleteContactById,
};
