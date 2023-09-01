const mongoose = require("mongoose");


const Product = mongoose.model("Product");

const createProduct = async (req, res) => {
  const {
    idUser,
    sku,
    name,
    description,
    stock,
    price,
    variants,
    favorite,
    img,
  } = req.body;

  try {
    const product = new Product({
      idUser,
      sku,
      name,
      description,
      stock,
      price,
      variants,
      favorite,
      img,
    });

    const response = await product.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}

// todos los productos

const getProduct = async (req, res) => {
  try {
    const response = await Product.find();
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




// Buscar por ID
const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (product) {
      return res.status(200).json({
        message: "Product found",
        product,
      });
    }
    return res.status(404).json({
      message: "Product not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}

// Actualizar por ID
const updateProductById = async (req, res) => {
  const { productId } = req.params;
  const productUpdated  = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {...productUpdated},
      { new: true }
    );
    console.log(productUpdated);
    if (product) {
      return res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    }
    return res.status(404).json({
      message: "Product not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}

// Eliminar
const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      return res.status(200).json({
        message: "Product deleted successfully",
        product,
      });
    }
    return res.status(404).json({
      message: "Product not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}


// todos los favoritos

const getFavorite = async (req, res) => {
  try {
    const response = await Product.find({favorite: true});
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

// Actualizar favorito
const updateFavoriteById = async (req, res) => {
  const { productId } = req.params;
  const { productUpdated } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      productUpdated,
      { new: true }
    );
    if (product) {
      return res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    }
    return res.status(404).json({
      message: "Product not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}



module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,


  getFavorite,
  updateFavoriteById,
};
