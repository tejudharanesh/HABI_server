import User from "../models/userModel.js";
import generateToken from "../utils/jwtUtils.js";

// Create a new user
export const createUser = async (req, res) => {
  const { name, phoneNumber, email, pinCode } = req.body;
  console.log("habiiiiiiiiiiiiii");

  try {
    console.log("inside");
    const newUser = new User({ name, phoneNumber, email, pinCode });
    console.log(newUser);
    await newUser.save();
    console.log("soioisjoijsoi");
    const token = generateToken(newUser);
    console.log(token);
    res.status(201).json({ user: newUser, authToken: token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Example of a protected route
export const getProfile = (req, res) => {
  res.json({ user: req.user });
};
