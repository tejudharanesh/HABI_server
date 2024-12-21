import { Router } from "express";
const router = Router();
import authRoutes from "./auth.route.js";
import userRouter from "./userRoute.js";

router.use("/auth", authRoutes);
router.use("/user", userRouter);

export default router;
