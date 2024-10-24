import twilio from "twilio";
import dotenv from "dotenv"; // Load environment variables using ES6 syntax
dotenv.config(); // Initialize dotenv

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const client = new twilio(accountSid, authToken);
