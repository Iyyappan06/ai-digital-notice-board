import { NextRequest, NextResponse } from "next/server";
import { fetchNotices, createNotice } from "@/lib/notices";

export async function GET() {
  try {
    const notices = await fetchNotices();
    return NextResponse.json({ notices });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, category, important, expiry_date } = body;

    if (!title?.trim() || !description?.trim() || !category?.trim()) {
      return NextResponse.json(
        { error: "Title, description, and category are required." },
        { status: 400 }
      );
    }

    const notice = await createNotice({
      title:       title.trim(),
      description: description.trim(),
      category:    category.trim(),
      important:   Boolean(important),
      expiry_date: expiry_date || null,
    });

    return NextResponse.json({ notice }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}