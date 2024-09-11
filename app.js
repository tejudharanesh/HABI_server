const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const routes = require("./routes");
const connectDB = require("./config/dbConfig");
require("dotenv").config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", routes);

module.exports = app;
