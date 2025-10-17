import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "../services/mailer.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    if (!to || !subject) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const info = await sendEmail({ to, subject, text, html });
    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({
      error: "Failed to send email",
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📧 Local server: http://localhost:${PORT}`));
