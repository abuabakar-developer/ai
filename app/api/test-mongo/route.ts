import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    return NextResponse.json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
  }
}
