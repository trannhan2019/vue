const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { body } = require("express-validator");
const { validate } = require("../handlers/requestHandler");
const User = require("../models/userModel");

const router = express.Router();

router.post(
  "/register",
  body("name")
    .exists()
    .withMessage("Your name is required")
    .isLength({ min: 5 })
    .withMessage("Your name minimum 5 characters"),
  body("email")
    .exists()
    .withMessage("Email is required ")
    .isEmail()
    .withMessage("Email address is not formatted correctly")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject("Email already used");
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("password minimum 6 characters"),
  body("re_password")
    .exists()
    .withMessage("Re-Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Re-Password not match");
      return true;
    }),
  validate,
  registerUser
);

router.post(
  "/login",
  body("email")
    .exists()
    .withMessage("Email is required ")
    .isEmail()
    .withMessage("Email address is not formatted correctly"),
  body("password").exists().withMessage("Password is required"),
  validate,
  loginUser
);

module.exports = router;
