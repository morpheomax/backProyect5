const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Variantes
const {
    createVariants,
    getVariants,
    updateVariants,
    deleteVariants
} = require('../controllers/Variants.controller');

// Rutas para Variantes
router.post("/", auth, createVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.get("/", getVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.put("/:variantsId", auth, updateVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.delete("/:variantsId", auth, deleteVariants); // Corregido el prefijo de la ruta ("/variants" a "/")

module.exports = router;
