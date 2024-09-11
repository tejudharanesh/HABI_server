const express = require("express");
const router = express.Router();

const responses = {
  hello: "Hi there! How can I help you today?",
  "how are you": "I'm just a bot, but I'm doing great! How about you?",
  "what is your name": "I am your friendly chatbot.",
  "hi" : "please let me know how can i help you!",
  "hey" : "please let me know how can i help you! please drop your mobile ",


  // Add more predefined responses here
};

router.post("/message", (req, res) => {
  const { message } = req.body;
  const response =
    responses[message.toLowerCase()] || "Sorry, I don't understand that.";
  res.json({ response });
});

module.exports = router;
