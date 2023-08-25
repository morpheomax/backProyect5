const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    addresses: [
      {
        type: String,
      },
    ],
    phones: [
      {
        type: String,
        required: true,
      },
    ],
    rrss: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
