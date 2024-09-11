// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const twilio = require("twilio");

// // const app = express();
// // const port = 5000;

// // // Replace with your Twilio account SID and Auth Token
// // const accountSid = "ACdb13688dd318588c2866806197c9f067";
// // const authToken = "2d14023885cb2dc8ae5d98ce8a73ca46";
// // const client = new twilio(accountSid, authToken);

// // app.use(cors());
// // app.use(bodyParser.json());

// // app.post("/send-otp", (req, res) => {
// //   const { phoneNumber } = req.body;

// //   // Generate a random 6-digit OTP
// //   const otp = Math.floor(1000 + Math.random() * 9000);

// //   client.messages
// //     .create({
// //       body: `Thank you for login at habi, Your OTP is  ${otp}`,
// //       from: "+15677773554", // Your Twilio phone number
// //       to: phoneNumber,
// //     })
// //     .then((message) => {
// //       console.log(message.sid);
// //       res.status(200).send({ success: true, otp });
// //     })
// //     .catch((error) => {
// //       console.error(error);
// //       res.status(500).send({ success: false, error });
// //     });
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const twilio = require("twilio");

// const app = express();
// const port = 5000;

// // Replace with your Twilio account SID and Auth Token
// const accountSid = "ACdb13688dd318588c2866806197c9f067";
// const authToken = "2d14023885cb2dc8ae5d98ce8a73ca46";
// const client = new twilio(accountSid, authToken);

// app.use(cors());
// app.use(bodyParser.json());

// // Generate a random 6-digit OTP function
// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000);
// };

// // Store OTPs temporarily for validation (in a real application, use a database)
// const otpStore = {};

// app.post("/send-otp", (req, res) => {
//   const { phoneNumber } = req.body;

//   // Generate a new OTP
//   const otp = generateOTP();

//   // Store the OTP in memory (in production, use a database)
//   otpStore[phoneNumber] = otp;

//   client.messages
//     .create({
//       body: `Thank you for logging in at Habi. Your OTP is ${otp}`,
//       from: "whatsapp:+15677773554", // Your Twilio phone number
//       to: "whatsapp:" + phoneNumber,
//     })
//     .then((message) => {
//       console.log(message.sid);
//       res.status(200).send({ success: true, otp });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send({ success: false, error: error.message });
//     });
// });

// app.post("/validate-otp", (req, res) => {
//   const { phoneNumber, otp } = req.body;
//   console.log(phoneNumber);
//   console.log(otp);
//   console.log(otpStore);

//   // Retrieve the stored OTP for the phoneNumber
//   const storedOTP = otpStore[phoneNumber];
//   console.log("stored otp " + storedOTP);

//   if (storedOTP && otp == storedOTP) {
//     // OTP matches, clear OTP from memory (or database)
//     delete otpStore[phoneNumber];
//     res.status(200).send({ success: true });
//   } else {
//     res.status(400).send({ success: false, error: "Invalid OTP" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const app = require("./app");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
