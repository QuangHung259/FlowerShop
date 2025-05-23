const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
