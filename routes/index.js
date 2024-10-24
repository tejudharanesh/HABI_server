import { Router } from "express";
const router = Router();
import otpRouter from "./otpRoutes.js";
import userRouter from "./userRoute.js";

router.use("/otp", otpRouter);
router.use("/user", userRouter);

export default router;
