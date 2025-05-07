import nodemailer from 'nodemailer';

// Configure the nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVER_USER,   // Your email address
    pass: process.env.EMAIL_SERVER_PASS,   // Your email password or app password
  },
});

// Utility function to send reset email
export const sendResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  // Create an email message
  const mailOptions = {
    from: `"Taiksy Team" <${process.env.EMAIL_SERVER_USER}>`,  // Sender's address
    to: email,  // Receiver's address
    subject: 'Password Reset Instructions - Taiksy',  // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333333; text-align: center; font-size: 24px;">Hello from Taiksy Team 👋</h2>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          You requested a password reset. Please follow the instructions below to reset your password.
        </p>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          <a
            href="${resetLink}"
            style="display: inline-block; margin: 16px 0; padding: 12px 20px; background-color: #eab308; color: white; text-decoration: none; text-align: center; border-radius: 5px; font-size: 16px;"
          >
            Reset Your Password
          </a>
        </p>
        <p style="font-size: 14px; color: #888888; text-align: center;">
          If you didn't request a password reset, please ignore this email. This link will expire in 1 hour.
        </p>
        <hr style="margin-top: 24px; border: 0; border-top: 1px solid #e0e0e0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          © ${new Date().getFullYear()} Taiksy, All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send reset email to ${email}`, error);
  }
};
