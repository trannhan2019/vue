const express = require("express");
const { getInfo } = require("../controllers/userController");
const { auth } = require("../middlewares/tokenMiddleware");

const router = express.Router();

router.get("/", auth, getInfo);

module.exports = router;
