const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/otpController");
const {
  sendOtpMiddleware,
  verifyOtpMiddleware,
} = require("../middleware/otpMiddleware");

router.post("/send", sendOtpMiddleware, sendOtp);
router.post("/validate", verifyOtpMiddleware);

module.exports = router;
