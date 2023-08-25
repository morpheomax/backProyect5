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
router.post("/variants", auth, createVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.get("/variants", getVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.put("/variants/:variantsId", auth, updateVariants); // Corregido el prefijo de la ruta ("/variants" a "/")
router.delete("/variants/:variantsId", auth, deleteVariants); // Corregido el prefijo de la ruta ("/variants" a "/")

module.exports = router;
