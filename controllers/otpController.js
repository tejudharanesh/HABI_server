import twilio from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = req.otp;

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+15677773554",
      to: phoneNumber,
    });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export default { sendOtp };
