const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const responseHandler = require("../handlers/responseHandler");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" });
};

//register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return responseHandler.badrequest(res, "username already used");
    }
    //Create new user
    //c1
    //   const user = await User.create({
    //     name,
    //     email,
    //     password,
    //   });
    //c2
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    await newUser.save();
    const token = generateToken(newUser._id);

    responseHandler.created(res, {
      token,
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch {
    responseHandler.error(res);
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check DB if user exists
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) return responseHandler.badrequest(res, "User not exist");
    // User exists, now Check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id);
    if (user && passwordIsCorrect) {
      responseHandler.created(res, {
        token,
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return responseHandler.badrequest(res, "Invalid email or password");
    }
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
