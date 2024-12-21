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
