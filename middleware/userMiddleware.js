const User = require("../models/userModel");

const checkUserExists = async (req, res, next) => {
  const { phoneNumber } = req.body;
  let user = await User.findOne({ phoneNumber });
  if (!user) {
    user = new User({ phoneNumber });
    await user.save();
    console.log("from userMiddlewar");
    console.log(user);
  }
  req.user = user;
  next();
};

module.exports = { checkUserExists };
