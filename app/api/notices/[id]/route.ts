import { NextRequest, NextResponse } from "next/server";
import {
  fetchNoticeById,
  updateNotice,
  deleteNotice,
} from "@/lib/notices";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const notice = await fetchNoticeById(id);
    if (!notice) {
      return NextResponse.json({ error: "Notice not found." }, { status: 404 });
    }
    return NextResponse.json({ notice });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updated = await updateNotice(id, {
      title:       body.title?.trim(),
      description: body.description?.trim(),
      category:    body.category?.trim(),
      important:   typeof body.important === "boolean" ? body.important : undefined,
      expiry_date: body.expiry_date ?? undefined,
    });

    return NextResponse.json({ notice: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    await deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}