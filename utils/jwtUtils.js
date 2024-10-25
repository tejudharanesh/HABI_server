import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign, verify } = pkg;
const secret = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const payload = {
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };

  return sign(payload, secret);
};

export const verifyToken = (token) => {
  return verify(token, secret);
};
