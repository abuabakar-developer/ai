// app/api/auth/register/route.ts
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  await dbConnect();

  const { email, password, businessName } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response('User already exists', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    businessName,
  });

  return Response.json({
    message: 'User created',
    user: {
      email: newUser.email,
      businessName: newUser.businessName,
    },
  });
}
