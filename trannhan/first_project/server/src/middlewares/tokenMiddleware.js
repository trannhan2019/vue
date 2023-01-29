const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/responseHandler");
const User = require("../models/userModel");

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];
    // console.log(bearerHeader);
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY);
    }
    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  console.log(tokenDecoded);
  if (!tokenDecoded) return responseHandler.unauthorize(res);
  const user = await User.findById(tokenDecoded.id);

  if (!user) return responseHandler.unauthorize(res);

  req.user = user;

  next();
};

module.exports = { auth, tokenDecode };
