import express from "express";
import webPush from "web-push";
import { protectedRoute } from "../middleware/authMiddleware.js";

const vapidKeys = webPush.generateVAPIDKeys();
console.log("Public Key:", vapidKeys.publicKey);
console.log("Private Key:", vapidKeys.privateKey);

webPush.setVapidDetails(
  "mailto:tejudharanesh1234@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptions = {};

const router = express.Router();

router.get("/vapidKeys", protectedRoute, (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

router.post("/subscribe", (req, res) => {
  const { subscription, id } = req.body;
  subscriptions[id] = subscription;
  return res.status(201).json({ data: { success: true } });
});

router.post("/send", async (req, res) => {
  const { id } = req.body;

  if (!subscriptions[id]) {
    return res
      .status(404)
      .json({ data: { success: false, message: "Subscription not found" } });
  }

  const subscription = subscriptions[id];
  const payload = JSON.stringify({
    title: "Notification",
    message: "checking notification",
  });

  try {
    await webPush.sendNotification(subscription, payload);
    return res.status(201).json({ data: { success: true } });
  } catch (error) {
    console.error("Notification error:", error);
    return res
      .status(400)
      .json({ data: { success: false, error: error.message } });
  }
});

export default router; // Use 'export default' instead of module.exports
