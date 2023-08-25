const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Variantes
const {
    createContact,
    getAllContacts,
    
    deleteContactById
} = require('../controllers/Contact.controller.js');

// Rutas para Variantes
router.post("/contact", createContact); 
router.get("/contact", auth, getAllContacts); 
router.delete("/contact/:contactId", auth, deleteContactById); 

module.exports = router;
