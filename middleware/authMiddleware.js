import { verifyToken, generateTokenAndSetCookie } from "../utils/jwtUtils.js";
import User from "../models/userModel.js";
const otpStore = {};

const generateOtp = (phoneNumber) => {
  // Remove +91 if it exists and take only the last 10 digits
  phoneNumber = phoneNumber.slice(-10);
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[phoneNumber] = otp;
  return otp;
};

const validateOtp = (phoneNumber, otp) => {
  console.log(otpStore);

  if (otpStore[phoneNumber] && otpStore[phoneNumber] == otp) {
    // Delete the OTP after successful validation
    delete otpStore[phoneNumber];
    return true;
  }
  return false;
};

// Middleware to send OTP
export const sendOtpMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);

    const otp = generateOtp(phoneNumber);
    req.otp = otp;
    next();
  } catch (error) {
    console.error("Error in send OTP middleware:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const verifyOtpMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;
    console.log(phoneNumber, otp);

    if (validateOtp(phoneNumber, otp)) {
      // Check if user already exists
      let user = await User.findOne({ phoneNumber });

      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          phoneNumber,
        });

        await user.save();
      }

      // Generate token and set it in the cookie
      generateTokenAndSetCookie(user, res);

      return res
        .status(200)
        .json({ user, success: true, message: "OTP verified" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP", error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error in OTP verification middleware:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const protectedRoute = async (req, res, next) => {
  console.log("hello");

  try {
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized : No token Provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized : Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected Route in middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
