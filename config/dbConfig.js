import { connect } from "mongoose";
import dotenv from "dotenv"; // Load environment variables using ES6 syntax
dotenv.config(); // Initialize dotenv
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Database connection error: ", err);
  }
};

export default connectDB;
