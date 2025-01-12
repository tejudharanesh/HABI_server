import express from "express";
import fs from "fs/promises";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";

import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createProject", async (req, res) => {
  try {
    const filePath = "./projectData/project.json";

    console.log(req.body);

    const id = req.body.userId;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const fileData = await fs.readFile(filePath, "utf-8");
    const projectData = JSON.parse(fileData);

    projectData.name = user.name;
    projectData.email = user.email;
    projectData.phoneNumber = user.phoneNumber;
    projectData.clientId = user._id;

    const project = new Project(projectData);
    await project.save();

    res.status(200).json({ message: "Project created successfully", project });
    console.log("Project created successfully");
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: "Failed to create project",
      error: error.message,
    });
  }
  // TODO
});

router.get("/project", protectedRoute, async (req, res) => {
  try {
    const projects = await Project.find({ clientId: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
});

export default router;
