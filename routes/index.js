import { Router } from "express";
const router = Router();
import otpRouter from "./authRoutes.js";
import userRouter from "./userRoute.js";

router.use("/auth", otpRouter);
router.use("/user", userRouter);

export default router;
