const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// Categorías
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require('../controllers/Category.controller');

// Rutas para Categorías
router.post("/", auth, createCategory); 
router.get("/", getCategories);
router.get("/:categoryId", getCategoryById); 
router.put("/:categoryId", auth, updateCategoryById); 
router.delete("/:categoryId", auth, deleteCategoryById); 

module.exports = router;
