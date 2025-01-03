import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign, verify } = pkg;
const secret = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = (userId, res) => {
  const token = sign({ userId }, secret, {
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

  return verify(token, secret);
};
