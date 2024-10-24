import app from "./app.js"; // Import the app module
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(process.env.TWILIO_ACCOUNT_SID);
});
