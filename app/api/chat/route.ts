import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const userId = req.headers.get("x-user-id");

  if (!message || !userId) {
    return NextResponse.json({ error: "Message or user ID missing" }, { status: 400 });
  }

  try {
    await dbConnect();

    // Store user's message
    await Message.create({ from: "user", text: message, userId });

    // Fetch reply from OpenAI
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await openaiRes.json();
    let reply = data.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";

    // Business-specific context if general knowledge question
    const isGeneralKnowledge = /capital|president|largest|who|when|where|what/i.test(message);
    if (isGeneralKnowledge) {
      reply += `

---

While I'm happy to answer general knowledge questions, I'm primarily here to help you with Talksy AI Agent solutions for your business. If you're interested in learning how Talksy can help automate conversations, streamline workflows, or enhance customer engagement for your company, I'd be glad to provide more information or help you book a demo using the button below.

Is there anything specific about Talksy or AI assistants for business that you'd like to know about?`;
    }

    // Store bot's response
    await Message.create({ from: "bot", text: reply, userId });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
