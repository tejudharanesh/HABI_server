import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Importing cookie-parser using ES6 syntax
import routes from "./routes/index.js"; // Ensure to use the .js extension with ES6 modules
import connectDB from "./config/dbConfig.js";
import dotenv from "dotenv"; // Load environment variables using ES6 syntax

dotenv.config(); // Initialize dotenv

const app = express();

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data

app.use(cookieParser()); // Add cookie parsing middleware

const corsOptions = {
  origin: "http://localhost:5173", // frontend origin
  credentials: true, // allow sending cookies with requests
};

connectDB();

app.use(cors(corsOptions)); // Apply CORS middleware
app.use("/api", routes);

export default app; // Use 'export default' instead of module.exports
