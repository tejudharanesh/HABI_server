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
otpRouter.get("/verify", verifyTokenMiddleware, (req, res) => {
  // This endpoint assumes the token is valid and `req.user` is populated
  console.log("dkedmekdmked");
  
  res.status(200).json({ user: req.user });
});
export default otpRouter; // Use 'export default' instead of module.exports
