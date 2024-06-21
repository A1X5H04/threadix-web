import { likes } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;
    const { session, user } = await validateRequest();

    if (!session || !user) {
      return new NextResponse("Not authenticated", { status: 401 });
    }

    const { id } = user;

    await db.insert(likes).values({
      userId: id,
      postId,
    });

    return NextResponse.json({ success: true, message: "Post liked" });
  } catch (error) {
    console.log("POST_LIKE_ERROR", error);
    return new NextResponse("", { status: 500 });
  }
}
