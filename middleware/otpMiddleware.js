const otpStore = {};

const generateOtp = (phoneNumber) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[phoneNumber] = otp;
  return otp;
};

const validateOtp = (phoneNumber, otp) => {
  return otpStore[phoneNumber] && otpStore[phoneNumber] == otp;
};

export const sendOtpMiddleware = async (req, res, next) => {
  const { phoneNumber } = req.body;
  const otp = generateOtp(phoneNumber);
  req.otp = otp;
  next();
};

export const verifyOtpMiddleware = (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  if (validateOtp(phoneNumber, otp)) {
    res.status(200).send({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Invalid OTP" });
  }
};
