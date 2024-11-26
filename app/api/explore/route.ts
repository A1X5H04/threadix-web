import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const popularPosts = await db.query.posts.findMany({
    where: (post, { ne }) => ne(post.userId, user.id),
    orderBy: (post, { desc }) => desc(post.likesCount),
    limit: 5,
  });

  return NextResponse.json({ popularPosts });
}
