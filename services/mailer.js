import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,       // STARTTLS
    requireTLS: true,    // Gmail bắt buộc TLS
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD, // App Password (16 ký tự)
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    },
    connectionTimeout: 10_000,
    logger: true,
    debug: true,
  });

  // ✅ Kiểm tra có nhận đúng ENV chưa (ẩn pass để an toàn)
  console.log("🔍 ENV check:", {
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD ? "[OK]" : "[MISSING]",
  });

  // ✅ Gửi mail
  return transporter.sendMail({
    from: `"Apache" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  });
}
