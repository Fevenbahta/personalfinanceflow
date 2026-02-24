import nodemailer from "nodemailer";

/**
 * Sends an email using Gmail SMTP
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Email body
 */
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are not set in environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  } catch (error: any) {
    console.error("Failed to send email:", error.message);
    throw error; // re-throw to handle in controllers
  }
};