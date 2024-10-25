import express from "express";
import { createUser } from "../controllers/userController.js"; // Include .js extension

const userRouter = express.Router();

// Create a new user
userRouter.post("/push", createUser);

export default userRouter; // Use 'export default' instead of module.exports
