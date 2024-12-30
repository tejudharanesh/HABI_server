import { Schema, model } from "mongoose";

// Define the nested substage schema
const NestedSubstageSchema = new Schema({
  stageName: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in days
  progress: { type: Number, required: true, min: 0, max: 100 },
  photos: { type: [String], default: [] }, // Array of photo URLs
  videos: { type: [String], default: [] }, // Array of video URLs
  status: { type: String, required: true, enum: ["ongoing", "completed"] },
  isManagerProceed: { type: Boolean, default: false },
  isClientProceed: { type: Boolean, default: false },
  isDelayed: { type: Boolean, default: false },
  delayReason: { type: String, default: "" },
  delayDuration: { type: Number, default: 0 },
  isDelayProceed: { type: Boolean, default: false },
});

// Define the substage schema
const SubstageSchema = new Schema({
  name: { type: String, required: true }, // Substage name
  nestedSubtages: { type: [NestedSubstageSchema], default: [] }, // Array of nested subStages
});

// Define the project schema
const ProjectSchema = new Schema({
  name: { type: String, required: true },
  clientId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  currentLocation: { type: String, required: true },
  projectName: { type: String, required: true },
  startDate: { type: Date, required: true },
  projectManager: { type: String, required: true },
  projectCost: { type: Number, required: true },
  dimension: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  SiteLocation: {
    type: String,
    required: true,
  },
  siteLocationLink: {
    type: String,
    required: true,
  },
  Architect: {
    type: String,
    required: true,
  },
  siteSupervisor: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "ongoing",
    enum: ["ongoing", "completed"],
  },
  substages: { type: [SubstageSchema], default: [] }, // Array of substages
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
