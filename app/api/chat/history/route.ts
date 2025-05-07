import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import Message from "@/models/Message"; // Message model

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const messages = await Message.find({ userId }).sort({ createdAt: 1 });

    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}
