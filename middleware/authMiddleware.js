import verify from "jsonwebtoken";
import findById from "../models/userModel.js";
const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = verify(token, secret);
    const user = await findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
