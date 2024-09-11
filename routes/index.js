const express = require("express");
const router = express.Router();
const otpRoutes = require("./otpRoutes");
const userRoutes = require("./userRoute");
const chatRoute = require("./chatRoute");

router.use("/otp", otpRoutes);
router.use("/user", userRoutes);

router.use("/chat", chatRoute);

module.exports = router;
