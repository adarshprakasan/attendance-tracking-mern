const User = require("../models/User");
const transporter = require("../config/email");
require("dotenv").config();
const SignUpUser = require("../models/SignupUser");
const LoginUser = require("../models/LoginUser");
let bcrypt = require("bcrypt");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("OTP sent:", info.response);
    }
  });
};

const register = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    const newUser = new User({ email, otp, otpExpires });
    await newUser.save();
    sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP verified." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: err.message });
  }
};

// ! signUp form

let SignUpUserData = async (req, res) => {
  const { admno, fn, email, pwd, ln, number } = req.body;
  console.log({ admno, fn, email, pwd });

  if (!fn || !email || !pwd) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    let hashedPassword = await bcrypt.hash(pwd, 10);
    const newUser = await SignUpUser.create({
      admno,
      fn,
      email,
      ln,
      number,
      pwd: hashedPassword,
    });
    // await newUser.save()
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while registering", error: error.message });
  }
};

// ! login ============

let LoginUserData = async (req, res) => {
  let { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await SignUpUser.findOne({ email: email });
    console.log({ user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isMatch = await bcrypt.compare(pwd, user.pwd);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
};
module.exports = { register, verifyOTP, SignUpUserData, LoginUserData };
