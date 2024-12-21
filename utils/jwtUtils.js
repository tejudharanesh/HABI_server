import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign, verify } = pkg;
const secret = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, //to prevent XSS attacks
    sameSite: "strict", //CSRF protection
    secure: process.env.NODE_ENV === "production",
  });
};

export const verifyToken = (token) => {
  console.log("here", token);

  return verify(token, secret);
};
