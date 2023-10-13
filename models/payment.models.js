const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema(
    {
        idUser: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        },
        sku: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true,
          },
        quantity: {
            type:Number,
            required: true,
        },  
        variants: {
            type: String,
            required: true,
          },
        dob: {
            type: Date,
            required: false,
          },
          address: {
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

    },
    {
      timestamps: true,
    }
)

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;