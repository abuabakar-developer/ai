// app/api/auth/reset/confirm/route.ts
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  await dbConnect();
  const { token, newPassword } = await req.json();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return new Response('Invalid or expired token', { status: 400 });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return Response.json({ message: 'Password reset successful' });
}
