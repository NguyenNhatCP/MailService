import { sendEmail } from "../../services/mailer.js";

export async function handler(event) {
  try {
    const { to, subject, text, html } = JSON.parse(event.body || "{}");

    if (!to || !subject) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const info = await sendEmail({ to, subject, text, html });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: info.messageId }),
    };
  } catch (err) {
    console.error("❌ Email send failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        message: err.message,
      }),
    };
  }
}
