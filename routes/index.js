import { Router } from "express";
const router = Router();
import otpRoutes from "./otpRoutes.js";
import userRoutes from "./userRoute.js";

router.use("/otp", otpRoutes);
router.use("/user", userRoutes);

export default router;
