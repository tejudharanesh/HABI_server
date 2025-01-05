import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
    required: true,
    default: "https://meet.google.com/yhw-fgzq-hgy",
  },
  mode: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "home",
  },
});

const meetingModel = mongoose.model("Meeting", meetingSchema);

export default meetingModel;
