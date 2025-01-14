const express = require("express");
const {
  register,
  verifyOTP,
  LoginUserData,
  SignUpUserData,
  UpdateSchema,
} = require("../controllers/authController");
const auth = require("../utils/auth");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/signup", SignUpUserData);
router.post("/login", LoginUserData);
router.post("/update", auth, UpdateSchema);

module.exports = router;
