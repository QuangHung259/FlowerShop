const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  createdAt: { type: Date, default: Date.now },
});

// Hash password trước khi lưu vào database
//userSchema.pre("save", async function (next) {
//  if (!this.isModified("passwordHash")) return next();
//  const salt = await bcrypt.genSalt(10);
//  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//  next();
//});

module.exports = mongoose.model("User", userSchema);
