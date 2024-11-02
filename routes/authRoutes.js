import express from "express";
import sendOtp from "../controllers/authController.js"; // Make sure to include the .js extension
import {
  sendOtpMiddleware,
  verifyOtpMiddleware,
  verifyTokenMiddleware,
} from "../middleware/authMiddleware.js"; // Include .js extension

const otpRouter = express.Router();

otpRouter.post("/send", sendOtpMiddleware, sendOtp);
otpRouter.post("/validate", verifyOtpMiddleware);
otpRouter.get("/authenticate", verifyTokenMiddleware, (req, res) => {
  // This endpoint assumes the token is valid and `req.user` is populated

  res.status(200).json({ success: true, user: req.user });
});
export default otpRouter; // Use 'export default' instead of module.exports
