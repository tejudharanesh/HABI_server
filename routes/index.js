import { Router } from "express";
const router = Router();
import authRoutes from "./auth.route.js";
import userRouter from "./userRoute.js";
import meetingRoutes from "./meeting.route.js";
import notificationRoutes from "./notification.route.js";
import projectsRoutes from "./projects.route.js";

router.use("/auth", authRoutes);
router.use("/meeting", meetingRoutes);
router.use("/user", userRouter);
router.use("/notifications", notificationRoutes);
router.use("/projects", projectsRoutes);

export default router;
