import { Schema, model } from "mongoose";

const userSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  sitePinCode: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "lead",
  },
});

const User = model("User", userSchema);

export default User;
