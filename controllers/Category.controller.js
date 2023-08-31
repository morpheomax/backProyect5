// const mongoose = require("mongoose");

// const Category = mongoose.model("Category");

const {Category} = require('../models/Category.models')

// Crear categoría
const createCategory = async (req, res) => {
  const { name, description, subcategories } = req.body;
console.log(req.body)
  try {
    const category = new Category({
      name,
      description,
      subcategories,
    });

    const response = await category.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: response, 
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

// Obtener categoría por id
const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (category) {
      return res.status(200).json({
        message: "Category found",
        category,
      });
    }
    return res.status(404).json({
      message: "Category not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

// Obtener Categorias completas

const getCategories = async (req, res) => {
  try {
    const response = await Category.find();
    return res.status(200).json({
      message: "Ok",
      detail: response,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Internal Server Error",
      detail: err,
    });
  }
};




// Actualizar categoría por id
const updateCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryUpdated } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      categoryUpdated,
      { new: true }
    );
    if (category) {
      return res.status(200).json({
        message: "Category updated successfully",
        category,
      });
    }
    return res.status(404).json({
      message: "Category not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

// Eliminar categoría por id
const deleteCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (category) {
      return res.status(200).json({
        message: "Category deleted successfully",
        category,
      });
    }
    return res.status(404).json({
      message: "Category not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, // Esto mostrará el mensaje de error específico
    });
  }
};


module.exports = {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
};
