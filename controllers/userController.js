// In userController.js
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwtUtils.js";

// Create a new user and set JWT as HTTP-only cookie
export const createUser = async (req, res) => {
  console.log("Request Body: ", req.body); // Log incoming body

  const { name, phoneNumber, email, pinCode } = req.body;

  try {
    const newUser = new User({ name, phoneNumber, email, pinCode });
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
      .json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Example of a protected route
export const getProfile = (req, res) => {
  res.json({ user: req.user });
};
