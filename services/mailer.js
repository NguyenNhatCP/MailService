import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,       // STARTTLS
    requireTLS: true,    // Gmail bắt buộc TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password (16 ký tự)
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    },
    connectionTimeout: 10_000,
    logger: true,
    debug: true,
  });

  // Kiểm tra kết nối SMTP
  await transporter.verify((err, success) => {
    if (err) console.error("❌ SMTP verify failed:", err);
    else console.log("✅ SMTP server ready to take messages");
  });

  // Gửi mail
  return transporter.sendMail({
    from: `"Apache" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
