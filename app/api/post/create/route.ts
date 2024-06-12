import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user } = await validateRequest();
  const { content, parentId, media } = await req.json();

  if (!content) {
    return new NextResponse("Content is a required field!", { status: 400 });
  }

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const post = await db.insert(posts).values({
    userId: user.id,
    content,
    parentId,
    media,
  });
}
