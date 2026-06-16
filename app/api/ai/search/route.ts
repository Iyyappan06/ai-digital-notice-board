import { NextRequest, NextResponse } from "next/server";
import { fetchNotices } from "@/lib/notices";
import { searchWithAI } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    // Fetch all current active notices to give context to Gemini
    const notices = await fetchNotices();

    const answer = await searchWithAI(question.trim(), notices);

    return NextResponse.json({ answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("AI search error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}