import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';
import User from '@/models/User'; // MongoDB model

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userData = verifyToken(token);
  if (!userData) return NextResponse.json({ error: 'Invalid token' }, { status: 403 });

  await connectToDB();
  const user = await User.findById(userData.id);

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ botId: user.botId });
}
