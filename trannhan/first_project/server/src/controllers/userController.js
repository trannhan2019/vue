const User = require("../models/userModel");
const responseHandler = require("../handlers/responseHandler");

const getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return responseHandler.notfound(res);
    responseHandler.ok(res, {
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch {
    responseHandler.error(res);
  }
};

module.exports = {
  getInfo,
};
