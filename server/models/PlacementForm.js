const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
});

const placementFormSchema = new mongoose.Schema({
  admno: { type: String, required: true },
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  aadhar: { type: String, required: true },
  passport: { type: String, required: true },
  pancard: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  currentAddress: { type: addressSchema, required: true },
  permanentAddress: { type: addressSchema, required: true },
});

module.exports = mongoose.model("PlacementForm", placementFormSchema);
