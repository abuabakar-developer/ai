import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { verifyToken } from '@/lib/jwt';
import User from '@/models/User';

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userData = verifyToken(token);

  if (!userData || !userData.id) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  await dbConnect();

  const user = await User.findById(userData.id); // ✅ safe now

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ botId: user.botId });
}

