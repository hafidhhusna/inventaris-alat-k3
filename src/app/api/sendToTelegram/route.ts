import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const botToken = process.env.NEXT_PUBLIC_HTTP_API_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Missing bot token or chat ID" },
        { status: 500 }
      );
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.description }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
