const mongoose = require("mongoose");

const Store = mongoose.model("Store");

// Crear tienda
const createStore = async (req, res) => {
  const { name, logo, description, addresses, phones, rrss } = req.body;

  try {
    const store = new Store({
      name,
      logo,
      description,
      addresses,
      phones,
      rrss,
    });

    const response = await store.save();

    return res.status(201).json({
      message: "Store created successfully",
      store: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message,
    });
  }
};

// Obtener Tienda completa
const getStore = async (req, res) => {
  try {
    const response = await Store.find();
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


// Obtener tienda por ID
const getStoreById = async (req, res) => {
  const storeId = req.params.id;
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }
    return res.status(200).json({
      store,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message,
    });
  }
};

// Actualizar tienda por ID
const updateStore = async (req, res) => {
  const storeId = req.params.id;
  const updates = req.body;

  try {
    const store = await Store.findByIdAndUpdate(
      storeId,
      updates,
      { new: true } // Para obtener la tienda actualizada
    );
    console.log(updates);
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    return res.status(200).json({
      message: "Store updated successfully",
      store,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message,
    });
  }
};

// Eliminar tienda por ID
const deleteStore = async (req, res) => {
  const storeId = req.params.id;

  try {
    const store = await Store.findByIdAndRemove(storeId);

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    return res.status(200).json({
      message: "Store deleted successfully",
      store,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      detail: err.message,
    });
  }
};

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  deleteStore,
};
