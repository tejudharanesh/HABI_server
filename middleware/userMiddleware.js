// middlewares/userMiddleware.js
import User from "../models/userModel.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const phoneNumber = req.query.phoneNumber;
    console.log("dfkjfjikgn", phoneNumber);

    // Check if the user exists based on the provided clientId
    const user = await User.findOne({ phoneNumber });
    console.log("nekkddldldmd,", user);

    if (!user) {
      console.log("user not found");

      return res
        .status(200)
        .json({ success: false, message: "User profile not found" });
    }

    // Attach the user to the request object for access in the controller
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
