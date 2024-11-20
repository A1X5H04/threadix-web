import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } }
) {
  const { session, user } = await validateRequest();

  if (!user || !session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const likes = await db.query.likes.findMany({
    where: (like, { eq }) => eq(like.postId, postId),
    with: {
      user: {
        columns: {
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
}
