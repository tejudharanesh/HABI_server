import express from "express";
import sendOtp from "../controllers/otpController.js"; // Make sure to include the .js extension
import {
  sendOtpMiddleware,
  verifyOtpMiddleware,
} from "../middleware/otpMiddleware.js"; // Include .js extension

const otpRouter = express.Router();

otpRouter.post("/send", sendOtpMiddleware, sendOtp);
otpRouter.post("/validate", verifyOtpMiddleware);

export default otpRouter; // Use 'export default' instead of module.exports
