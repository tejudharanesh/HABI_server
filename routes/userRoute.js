const express = require("express");
const router = express.Router();
const { createUser, getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new user
router.post("/push", createUser);

// Example of a protected route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
