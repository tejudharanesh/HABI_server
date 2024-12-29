import { Router } from "express";
const router = Router();
import authRoutes from "./auth.route.js";
import userRouter from "./userRoute.js";
import meetingRoutes from "./meeting.route.js";

router.use("/auth", authRoutes);
router.use("/meeting", meetingRoutes);
router.use("/user", userRouter);

export default router;
