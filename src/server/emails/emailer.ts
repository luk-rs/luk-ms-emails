import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({
  path: [".env.local"],
});

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const transporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

async function send(
  sender: string,
  recipient: string,
  subject: string,
  body: string
) {
  const mailOptions = {
    from: sender, // Sender address
    to: recipient,
    subject,
    text: body, // Or HTML if using HTML content
  };

  const info = await transporter().sendMail(mailOptions);
  console.log("Email sent:", info.response);
}

export default { send };
