const express = require("express");
const {
  register,
  verifyOTP,
  LoginUserData,
  SignUpUserData,
} = require("../controllers/authController");
const auth = require("../utils/auth");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/signup", SignUpUserData);
router.post("/login", LoginUserData);

module.exports = router;
