const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String, 
    subcategories: [
      {
        name: {
          type: String,
          required: false,
        },
        description: String, 
      },
    ],
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = {Category};
