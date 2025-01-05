import User from "../models/userModel.js";
import Meeting from "../models/meetingModel.js";

export const getAllMeetings = async (req, res) => {
  try {
    const currentDate = new Date();

    // Extract current date and time components
    const currentDateString = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentTimeString = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Find all meetings with a date greater than the current date
    const upcomingMeetings = await Meeting.find();

    // Sort meetings by date and time
    upcomingMeetings.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
    });

    return res.status(200).json({
      message: "Upcoming meetings fetched successfully.",
      meetings: upcomingMeetings,
    });
  } catch (error) {
    console.error("Error fetching all meetings:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getClientMeeting = async (req, res) => {
  try {
    const { _id: clientId } = req.user;
    const currentDate = new Date();
    const currentDateString = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentTimeString = currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Find meetings matching the clientId and date/time criteria
    const clientMeetings = await Meeting.find({
      clientId,
    });

    return res.status(200).json({
      message: "Client meetings fetched successfully.",
      meetings: clientMeetings,
    });
  } catch (error) {
    console.error("Error fetching client meetings:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createMeeting = async (req, res) => {
  try {
    // Extract clientId and name from the logged-in user in the request object
    const { _id: clientId, name } = req.user;

    // Extract other fields from the request body
    const { date, time, mode, type } = req.body;

    // Validate required fields
    if (!date || !time || !mode || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse and validate the date and time format
    const parsedDate = new Date(`${date} ${time}`);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format." });
    }

    // Check if a meeting already exists for the user
    const existingMeeting = await Meeting.findOne({ clientId });

    if (existingMeeting) {
      // Update the existing meeting with new details
      existingMeeting.date = date;
      existingMeeting.time = time;
      existingMeeting.mode = mode;
      existingMeeting.type = type;

      // Save the updated meeting to the database
      await existingMeeting.save();

      return res.status(200).json({
        message: "Meeting updated successfully.",
        meeting: existingMeeting,
      });
    }

    // If no meeting exists, create a new one
    const newMeeting = new Meeting({
      clientId,
      name,
      date,
      time,
      mode,
      type,
    });

    // Save the new meeting to the database
    await newMeeting.save();

    return res.status(201).json({
      message: "Meeting created successfully.",
      meeting: newMeeting,
    });
  } catch (error) {
    console.error("Error creating/updating meeting:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteClientMeeting = async (req, res) => {
  try {
    // Extract the clientId from the logged-in user in the request object

    // Extract the meeting ID from the request parameters
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ message: "Meeting ID is required." });
    }

    // Find and delete the meeting that matches the clientId and meetingId
    const deletedMeeting = await Meeting.findOneAndDelete({
      _id: meetingId,
    });

    if (!deletedMeeting) {
      return res
        .status(404)
        .json({ message: "Meeting not found or not authorized to delete." });
    }

    return res.status(200).json({
      message: "Meeting deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting client meeting:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
