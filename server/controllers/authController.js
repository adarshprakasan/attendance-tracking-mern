const User = require("../models/User");
const transporter = require("../config/email");
const SignUpUser = require("../models/SignupUser");
const LoginUser = require("../models/LoginUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateNextAdmno } = require("../utils/admno");
require("dotenv").config();

//^=====================================================================
//! REGISTER
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

//^=====================================================================
//! GENERATE OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

//^=====================================================================
//! SEND OTP
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

//^=====================================================================
//! VERIFY OTP
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

//^=====================================================================
//! SIGN UP FORM
let SignUpUserData = async (req, res) => {
  const { fn, email, pwd, ln, number } = req.body;

  if (!fn || !email || !pwd) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const existingUser = await SignUpUser.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please Login" });
    }

    const nextAdmno = await generateNextAdmno();

    const hashedPassword = await bcrypt.hash(pwd, 10);

    const newUser = await SignUpUser.create({
      admno: nextAdmno,
      fn,
      email,
      ln,
      number,
      pwd: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        admno: newUser.admno,
        fn: newUser.fn,
        email: newUser.email,
      },
    });
  } catch (error) {
    // console.error("Error during user registration:", error);
    res.status(500).json({
      message: "Error while registering",
      error: error.message,
    });
  }
};

//^=====================================================================
//! LOGIN
const LoginUserData = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await SignUpUser.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(pwd, user.pwd);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { admno: user.admno, email: user.email, name: `${user.fn} ${user.ln}` },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      error: false,
      message: "Login successfully!",
      token,
      batchcode: user.batchcode,
    });
  } catch (err) {
    console.error("Login Error:", err.stack || err);
    return res
      .status(500)
      .json({ message: "Error during login", error: err.message });
  }
};

//^=====================================================================
//! UPDATE SCHEMA
const UpdateSchema = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email } = req.user;

    const user = await SignUpUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.admno) {
      return res.status(400).json({ message: "Admission number not found" });
    }
    
    //Uploading Photo and Updating Batchcode
    const { photoUrl, photoUploaded, batchcode } = req.body;

    if (photoUrl !== undefined) user.set("photoUrl", photoUrl);
    if (photoUploaded !== undefined) user.set("photoUploaded", photoUploaded);
    if (batchcode !== undefined) user.set("batchcode", batchcode);

    await user.save();

    res.status(200).json({
      admno: user.admno,
      batchcode: user.batchcode,
      photoUploaded: user.photoUploaded,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//^=====================================================================

module.exports = {
  register,
  verifyOTP,
  SignUpUserData,
  LoginUserData,
  UpdateSchema,
};
