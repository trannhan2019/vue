const express = require("express");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
