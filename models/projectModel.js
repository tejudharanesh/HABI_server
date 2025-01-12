import { Schema, model } from "mongoose";

// Define the substage schema
const SubstageSchema = new Schema({
  name: { type: String, required: true }, // Substage name
  duration: { type: Number, required: true }, // Duration in days
  progress: { type: Number, required: true, min: 0, max: 100 },
  photos: { type: [String], default: [] }, // Array of photo URLs
  videos: { type: [String], default: [] }, // Array of video URLs
  documents: { type: [String], default: [] },
  status: {
    type: String,
    required: true,
    enum: ["ongoing", "completed", "pending", "delayed"],
  },
  isManagerProceed: { type: Boolean, default: false },
  isClientProceed: { type: Boolean, default: false },
  isDelayed: { type: Boolean, default: false },
  delayReason: { type: String, default: "" },
  delayDuration: { type: Number, default: 0 },
  isDelayProceed: { type: Boolean, default: false },
});

// Define the stage schema
const StageSchema = new Schema({
  name: { type: String, required: true }, // Stage name
  order: { type: Number, required: true }, // Stage order
  substages: { type: [SubstageSchema], default: [] }, // Array of substages
});

// Define the project schema
const ProjectSchema = new Schema({
  name: { type: String, required: true },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  currentLocation: { type: String, required: true },
  projectName: { type: String, required: true },
  startDate: { type: Date, required: true },
  projectManager: { type: String, required: true },
  projectCost: { type: Number, required: true },
  dimension: { type: String, required: true },
  floor: { type: String, required: true },
  siteLocation: { type: String, required: true },
  siteLocationLink: { type: String, required: true },
  architect: { type: String, required: true },
  siteSupervisor: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["ongoing", "completed"],
  },
  package: { type: String, required: true },
  stages: { type: [StageSchema], default: [] }, // Array of stages
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for updates
});

// Pre-save middleware to update the `updatedAt` field
ProjectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Project model
const Project = model("Project", ProjectSchema);

export default Project;
