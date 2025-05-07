import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.openai.com/v1/models", {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
