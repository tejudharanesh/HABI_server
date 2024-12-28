import { client } from "../config/twilioConfig.js";
import User from "../models/userModel.js";

export const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = req.otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+16169652856",
      to: phoneNumber,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error during getMe", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const completeProfile = async (req, res) => {
  try {
    const { name, email, sitePinCode, currentLocation } = req.body;
    console.log(req.body);

    // `req.user` is set by the protectedRoute middleware
    const user = req.user;

    if (!user) {
      return res.status(500).json({
        success: false,
        message:
          "User not found in request. Ensure protected route is working.",
      });
    }
    console.log(user);

    // Validate required fields

    // Generate clientId
    const clientId = `${name.slice(0, 4).toUpperCase()}${user.phoneNumber.slice(
      -4
    )}`;

    // Append data to the user object
    user.clientId = clientId;
    user.name = name;
    user.email = email;
    user.sitePinCode = sitePinCode;
    user.currentLocation = currentLocation;
    user.isCompletedProfile = true;

    // Save the updated user
    console.log(user);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in complete profile middleware:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error during logout", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
