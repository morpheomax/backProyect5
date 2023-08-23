const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },

    username: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9 ]{3,30}$/.test(v);
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
      },
    },
    address: {
      type: String,
      required: false,
    },
    addressNumber: {
      type: Number,
      required: false,
    },
    commune: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    reference:{
      type:String,
      required: false,
    },
    postalcode: {
      type: Number,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    rol: {
      type: String,
      required: false,
      default: "usuario",
    }
   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
