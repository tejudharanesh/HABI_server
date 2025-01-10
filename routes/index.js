import { Router } from "express";
const router = Router();
import authRoutes from "./auth.route.js";
import userRouter from "./userRoute.js";
import meetingRoutes from "./meeting.route.js";
import notificationRoutes from "./notification.route.js";
router.use("/auth", authRoutes);
router.use("/meeting", meetingRoutes);
router.use("/user", userRouter);
router.use("/notifications", notificationRoutes);

export default router;
