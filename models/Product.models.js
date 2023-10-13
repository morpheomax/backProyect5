const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      
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
      
    },
    subcategory: {
      type: String,
      
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    variants: {
      type: String, 
      
    },
    favorite:{
      type:[String]
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
