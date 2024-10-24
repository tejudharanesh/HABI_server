import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
const secret = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };

  return sign(payload, secret, { expiresIn: "1m" });
};

const verifyToken = (token) => {
  return verify(token, secret);
};

export default { generateToken, verifyToken };
