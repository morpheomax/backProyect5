const mongoose = require("mongoose");

const VariantsSchema = new mongoose.Schema(
  {
    
    variants: [
      {
        name: {
          type: String,
          required: true,
        },
        values: [String], 
      },
    ],
  }
);

const Variants = mongoose.model("Variants", VariantsSchema);

module.exports = Variants;
