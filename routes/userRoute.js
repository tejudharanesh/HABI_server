import express from "express";
import { createUser, getProfile } from "../controllers/userController.js"; // Include .js extension
import authMiddleware from "../middleware/authMiddleware.js"; // Include .js extension

const router = express.Router();

// Create a new user
router.post("/push", createUser);

// Example of a protected route
router.get("/profile", authMiddleware, getProfile);

export default router; // Use 'export default' instead of module.exports
