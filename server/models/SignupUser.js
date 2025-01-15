const mongoose = require("mongoose");

const signupUserSchema = new mongoose.Schema({
  admno: { type: String, required: true },
  fn: { type: String, required: true },
  ln: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  batchcode: { type: String, default: "" },
  photoUrl: { type: String, default: "" },
  photoUploaded: { type: Boolean, default: false },
});

module.exports = mongoose.model("SignupUser", signupUserSchema);
