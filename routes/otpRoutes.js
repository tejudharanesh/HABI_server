import express from "express";
import sendOtp from "../controllers/otpController.js"; // Make sure to include the .js extension
import {
  sendOtpMiddleware,
  verifyOtpMiddleware,
} from "../middleware/otpMiddleware.js"; // Include .js extension

const router = express.Router();

router.post("/send", sendOtpMiddleware, sendOtp);
router.post("/validate", verifyOtpMiddleware);

export default router; // Use 'export default' instead of module.exports
