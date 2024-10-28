// In userController.js
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwtUtils.js";

// Create a new user and set JWT as HTTP-only cookie
export const createUser = async (req, res) => {
  console.log("Request Body: ", req.body); // Log incoming body

  const { name, phoneNumber, email, pinCode, address } = req.body;
  const clientId = name.slice(0, 4).toLowerCase() + phoneNumber.slice(-4);
  console.log(clientId);

  try {
    const newUser = new User({
      clientId,
      name,
      phoneNumber,
      email,
      sitePinCode: pinCode,
      currentLocation: address,
    });
    await newUser.save();

    const token = generateToken(newUser);
    console.log("Generated Token:", token); // This should log the token to the console

    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a user's profile
export const getProfile = (req, res) => {
  const token = generateToken(req.user);
  console.log("Generated Token:", token); // This should log the token to the console

  // The user profile is already attached to req.user by the middleware

  res
    .cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "User profile fetched successfully",
      success: true,
      profile: req.user,
    });
};
