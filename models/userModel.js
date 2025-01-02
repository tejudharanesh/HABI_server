import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    clientId: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      default: "",
    },
    sitePinCode: {
      type: String,
      default: "",
    },
    currentLocation: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "lead",
    },
    level: {
      type: String,
      default: "level 0",
    },
    coverImage: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    isCompletedProfile: {
      type: Boolean,
      default: false,
    },
    sitePhotos: {
      type: [String],
      default: [], // Default to an empty array
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
