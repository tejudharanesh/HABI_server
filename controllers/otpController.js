import { client } from "../config/twilioConfig.js";

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = req.otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+16169652856",
      to: phoneNumber,
    });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export default sendOtp;
