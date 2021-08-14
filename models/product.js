const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    image: {
      type:String
    },
    fastDelivery:{
        type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);