const mongoose = require("mongoose");

const signupUserSchema = new mongoose.Schema({
  fn: { type: String, required: true },
  ln: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
});

module.exports = mongoose.model("SignupUser", signupUserSchema);
