const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Productos
const {
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,

  getFavorite,
  updateFavoriteById,

} = require('../controllers/Product.controller');

// Rutas para Productos
router.post("/products", auth, createProduct); 
router.put("/favorite/:productId", updateFavoriteById); 
router.get("/favorite", getFavorite);
router.get("/products", getProduct);
router.get("/products/:productId", getProductById); 
router.put("/products/:productId", auth, updateProductById); 
router.delete("/products/:productId", auth, deleteProductById); 

module.exports = router;