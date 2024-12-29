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
    const upcomingMeetings = await Meeting.find({
      $or: [
        { date: { $gt: currentDateString } },
        {
          date: currentDateString,
          time: { $gt: currentTimeString },
        },
      ],
    });

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

    // Find meetings matching the clientId and date greater than the current date
    const clientMeetings = await Meeting.find({
      clientId,
      $or: [
        { date: { $gt: currentDateString } },
        {
          date: currentDateString,
          time: { $gt: currentTimeString },
        },
      ],
    });

    // Sort meetings by date and time
    clientMeetings.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA - dateB;
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
    const { date, time, mode } = req.body;

    // Validate required fields
    if (!date || !time || !mode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Parse and validate the date and time format
    const parsedDate = new Date(`${date} ${time}`);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format." });
    }

    // Create a new meeting instance
    const newMeeting = new Meeting({
      clientId,
      name,
      date,
      time,
      mode,
    });

    // Save the meeting to the database
    await newMeeting.save();

    // Respond with the created meeting
    return res.status(201).json({
      message: "Meeting created successfully.",
      meeting: newMeeting,
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
