import express from "express";
import { sendOtp, getMe } from "../controllers/authController.js"; // Make sure to include the .js extension
import {
  sendOtpMiddleware,
  verifyOtpMiddleware,
  protectedRoute,
  completeProfileMiddleware,
} from "../middleware/authMiddleware.js"; // Include .js extension

const router = express.Router();

router.get("/me", protectedRoute, getMe);
router.post("/sendOtp", sendOtpMiddleware, sendOtp);
router.post("/validateOtp", verifyOtpMiddleware);
router.post("/completeProfile", protectedRoute, completeProfileMiddleware);

export default router; // Use 'export default' instead of module.exports
