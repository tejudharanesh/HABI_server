import express from "express";
import { createUser, getProfile } from "../controllers/userController.js"; // Include .js extension
import { checkUserExists } from "../middleware/userMiddleware.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/push", createUser);
userRouter.get("/getUsers", checkUserExists, getProfile);

export default userRouter; // Use 'export default' instead of module.exports
