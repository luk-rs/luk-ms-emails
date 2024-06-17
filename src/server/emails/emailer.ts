import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer/index.js";

dotenv.config({
  path: [".env.local"],
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function send(mailOptions: Mail.Options) {
  return await transporter.sendMail(mailOptions);
}

export default { send };
