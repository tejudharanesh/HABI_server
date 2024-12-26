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
  try {
    const token = req.cookies.token;

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

// Complete Profile Middleware
export const completeProfileMiddleware = async (req, res, next) => {
  try {
    const { name, email, pinCode, sitePinCode, currentLocation } = req.body;

    // `req.user` is set by the protectedRoute middleware
    const user = req.user;

    if (!user) {
      return res.status(500).json({
        success: false,
        message:
          "User not found in request. Ensure protected route is working.",
      });
    }

    // Validate required fields
    if (!name || !email || !pinCode || sitePinCode || currentLocation) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Generate clientId
    const clientId = `${name.slice(0, 4).toUpperCase()}${user.phoneNumber.slice(
      -4
    )}`;

    // Append data to the user object
    user.clientId = clientId;
    user.name = name;
    user.email = email;
    user.pinCode = pinCode;
    user.sitePinCode = sitePinCode;
    user.currentLocation = currentLocation;
    user.isCompletedProfile = true;

    // Save the updated user
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
