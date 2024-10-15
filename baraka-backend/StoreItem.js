const mongoose = require("mongoose");

const StoreItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
});

mongoose.model("StoreItem", StoreItemSchema);
