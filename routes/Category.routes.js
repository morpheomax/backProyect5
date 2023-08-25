const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Categorías
const {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/Category.controller');

// Rutas para Categorías
router.post("/category", auth, createCategory); 
router.get("/category",getCategories)
router.get("/category/:categoryId", getCategoryById); 
router.put("/category/:categoryId", auth, updateCategoryById); 
router.delete("/category/:categoryId", auth, deleteCategoryById); 

module.exports = router;
