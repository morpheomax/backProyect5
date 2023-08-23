const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
      autoIncrement: true, 
    },
    sku: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    variants: {
      type: String, 
      required: true,
    },
    img: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
