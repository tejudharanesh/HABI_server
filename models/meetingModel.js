import { schema, model, Schema } from "mongoose";

const meetingSchema = new schema({
  clientId: {
    type: Schema.Types.ObjectId,
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
});

const meetingModel = model("Meeting", meetingSchema);

export default meetingModel;
