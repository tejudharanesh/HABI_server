import express from "express";
import { createUser, getProfile } from "../controllers/userController.js"; // Include .js extension
import { checkUserExists } from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/push", createUser);
userRouter.post("/getProfile", checkUserExists, getProfile);

export default userRouter; // Use 'export default' instead of module.exports
