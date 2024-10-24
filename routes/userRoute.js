import express from "express";
import { createUser, getProfile } from "../controllers/userController.js"; // Include .js extension
import authMiddleware from "../middleware/authMiddleware.js"; // Include .js extension

const userRouter = express.Router();

// Create a new user
userRouter.post("/push", createUser);

// Example of a protected route
userRouter.get("/profile", authMiddleware, getProfile);

export default userRouter; // Use 'export default' instead of module.exports
