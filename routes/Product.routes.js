const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Productos
const {
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById
} = require('../controllers/Product.controller');

// Rutas para Productos
router.post("/", auth, createProduct); 
router.get("/products", getProduct)
router.get("/:productId", getProductById); 
router.put("/:productId", auth, updateProductById); 
router.delete("/:productId", auth, deleteProductById); 

module.exports = router;
