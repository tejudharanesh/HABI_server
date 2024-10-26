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
    pinCode: user.pinCode,
  };

  return sign(payload, secret);
};

export const verifyToken = (token) => {
  console.log("here", token);

  return verify(token, secret);
};
