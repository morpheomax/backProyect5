const mongoose = require("mongoose");

const CheckOut = mongoose.model("Checkout");

const CreateCheckout = async (req, res) => {
  const { iduser, name, lastname, email, phone, message, address, addressNumber, commune, postalcode, product, qty, price } = req.body;

  try {
    // Validación de datos (por ejemplo, asegurarse de que los campos obligatorios estén presentes)
    if (!iduser || !name || !email || !phone || !address || !postalcode || !product || !qty || !price) {
      return res.status(400).json({
        message: "Por favor, proporcione todos los campos obligatorios.",
      });
    }

    const CheckoutDocument = new CheckOut({
      iduser,
      name,
      lastname,
      email,
      phone,
      message,
      address,
      addressNumber,
      commune,
      postalcode,
      product,
      qty,
      price,
    });
    const response = await CheckoutDocument.save();

    return res.status(201).json({
      message: "Compra creada exitosamente",
      checkout: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error interno del servidor",
      detail: err.message,
    });
  }
}


module.exports = {
    CreateCheckout,
  };