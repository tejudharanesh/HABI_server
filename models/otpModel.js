const otpStore = {};

const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

const storeOTP = (phoneNumber, otp) => {
  otpStore[phoneNumber] = otp;
};

const getOTP = (phoneNumber) => otpStore[phoneNumber];

const deleteOTP = (phoneNumber) => {
  delete otpStore[phoneNumber];
};

export default {
  generateOTP,
  storeOTP,
  getOTP,
  deleteOTP,
};
 