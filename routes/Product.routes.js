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
router.post("/", auth, createProduct); 
router.put("/favorite/:productId", updateFavoriteById); 
router.get("/favorite", getFavorite);
router.get("/", getProduct);
router.get("/:productId", getProductById); 
router.put("/:productId", auth, updateProductById); 
router.delete("/:productId", auth, deleteProductById); 

module.exports = router;