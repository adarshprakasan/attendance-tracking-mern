const mongoose = require("mongoose");

const loginUserSchema = new mongoose.Schema({
  fn: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
});

module.exports = mongoose.model("LoginUser", loginUserSchema);
