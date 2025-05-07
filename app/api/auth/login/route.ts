// app/api/auth/login/route.ts
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response('Invalid credentials', { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return new Response('Invalid credentials', { status: 401 });

  const token = signToken({ id: user._id, email: user.email });

  return Response.json({ token });
}
