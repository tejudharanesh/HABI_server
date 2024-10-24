import User, { findOne } from "../models/userModel.js";

const checkUserExists = async (req, res, next) => {
  const { phoneNumber } = req.body;
  let user = await findOne({ phoneNumber });
  if (!user) {
    user = new User({ phoneNumber });
    await user.save();
    console.log("from userMiddlewar");
    console.log(user);
  }
  req.user = user;
  next();
};

export default { checkUserExists };
