const mongoose = require("mongoose");

const Variants = mongoose.model("Variants");

const createVariants = async (req, res) => {
  const { variants } = req.body;

  try {
    const variantsDocument = new Variants({
      variants,
    });
    const response = await variantsDocument.save();

    return res.status(201).json({
      message: "Variants created successfully",
      variants: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
}

const getVariants = async (req, res) => {
  try {
    const variants = await Variants.findOne();

    if (variants) {
      return res.status(200).json({
        message: "Variants found",
        variants,
      });
    }
    return res.status(404).json({
      message: "Variants not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

const updateVariants = async (req, res) => {
  const { variantsId } = req.params;
  const  variantsUpdated  = req.body;

  try {
    const variants = await Variants.findByIdAndUpdate(
      variantsId,
      {...variantsUpdated},
      { new: true }
    );
    console.log(variantsUpdated)

    if (variants) {
      return res.status(200).json({
        message: "Variants updated successfully",
        variants,
      });
    }
    return res.status(404).json({
      message: "Variants not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

const deleteVariants = async (req, res) => {
  const { variantsId } = req.params;

  try {
    const variants = await Variants.findByIdAndDelete(variantsId);
    if (variants) {
      return res.status(200).json({
        message: "Variants deleted successfully",
        variants,
      });
    }
    return res.status(404).json({
      message: "Variants not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message, 
    });
  }
};

module.exports = {
  createVariants,
  getVariants,
  updateVariants,
  deleteVariants,
};
