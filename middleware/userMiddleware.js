// middlewares/userMiddleware.js
import User from "../models/userModel.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    // Check if the user exists based on the provided clientId
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Attach the user to the request object for access in the controller
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
