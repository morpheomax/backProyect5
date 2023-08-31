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
router.post("/categories", auth, createCategory); 
router.get("/categories", getCategories);
router.get("/categories/:categoryId", getCategoryById); 
router.put("/categories/:categoryId", auth, updateCategoryById); 
router.delete("/categories/:categoryId", auth, deleteCategoryById); 

module.exports = router;
