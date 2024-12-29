import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import {
  getAllMeetings,
  getClientMeeting,
  createMeeting,
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/getAllMeetings", protectedRoute, getAllMeetings);
router.get("/getClientMeeting", protectedRoute, getClientMeeting);
router.post("/createMeeting", protectedRoute, createMeeting);

export default router; // Use 'export default' instead of module.exports
