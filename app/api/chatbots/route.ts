
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Chatbot from '@/models/Chatbot';
import { verifyToken } from '@/lib/jwt';

// ✅ POST handler: Create a new chatbot (user-specific)
export async function POST(req: Request) {
  try {
    // Step 1: Extract the Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Step 2: Verify token and extract user info
    const decoded: any = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Step 3: Parse request body
    const { url, name, language } = await req.json();

    if (!url || !name || !language) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Step 4: Connect to database
    await dbConnect();

    // Step 5: Create chatbot associated with user ID
    const chatbot = await Chatbot.create({
      url,
      name,
      language,
      user: decoded.id,
    });

    // Step 6: Return success
    return NextResponse.json(chatbot, { status: 201 });
  } catch (error) {
    console.error('POST /api/chatbots error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// ✅ GET handler: Get all chatbots for the logged-in user
export async function GET(req: Request) {
  try {
    // Step 1: Extract the Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Step 2: Verify token and extract user info
    const decoded: any = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Step 3: Connect to database
    await dbConnect();

    // Step 4: Fetch all chatbots for the user
    const chatbots = await Chatbot.find({ user: decoded.id }).sort({ createdAt: -1 });

    // Step 5: Return data
    return NextResponse.json(chatbots);
  } catch (error) {
    console.error('GET /api/chatbots error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

