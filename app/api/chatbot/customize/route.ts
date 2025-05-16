// app/api/chatbot/customize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import ChatbotSetting from '@/models/ChatbotSetting';

// POST /api/chatbot/customize
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();

    // Check if settings already exist (assuming only 1 document allowed)
    let settings = await ChatbotSetting.findOne();

    if (settings) {
      // Update existing document
      await ChatbotSetting.updateOne({}, data);
    } else {
      // Create new
      settings = await ChatbotSetting.create(data);
    }

    return NextResponse.json({ message: 'Customization saved successfully.' }, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to save customization.' }, { status: 500 });
  }
}

// GET /api/chatbot/customize
export async function GET() {
  try {
    await dbConnect();
    const settings = await ChatbotSetting.findOne();

    if (!settings) {
      return NextResponse.json(
        {
          botName: 'Talksy',
          welcomeMessage: 'Hi there! How can I help you today?',
          position: 'bottom-right',
          theme: 'light',
          bubbleColor: '#2563eb',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch customization.' }, { status: 500 });
  }
}
