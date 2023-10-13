const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Información de la tienda
const {
    createStore,
  getStore,
  
  updateStore,
  deleteStore,

} = require('../controllers/Store.controller')

// Rutas para información de la tienda

router.post("/", auth, createStore); 
router.get("/", getStore);

router.put("/:id", auth, updateStore); 
router.delete("/:id", auth, deleteStore); 

module.exports = router;