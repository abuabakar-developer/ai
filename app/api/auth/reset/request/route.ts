// app/api/auth/reset/request/route.ts
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';
import { transporter } from '@/lib/mail';

export async function POST(req: Request) {
  await dbConnect();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response('No user found', { status: 404 });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
  });

  return Response.json({ message: 'Reset link sent' });
}


