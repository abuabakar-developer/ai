import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import QnA from '@/models/QnA';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ message: 'Email required' }, { status: 400 });

  try {
    await dbConnect();
    const qas = await QnA.find({ email });
    return NextResponse.json(qas, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching QnA' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { question, answer, email } = body;

  if (!email) return NextResponse.json({ message: 'Email required' }, { status: 400 });

  try {
    await dbConnect();
    const newQnA = await QnA.create({ question, answer, email });
    return NextResponse.json(newQnA, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating QnA' }, { status: 500 });
  }
}
