import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const allPosts = await db.query.posts.findMany({
      with: {
        user: {
          columns: {
            name: true,
            avatar: true,
            isVerified: true,
          },
        },
        likes: {
          columns: {
            userId: true,
            createdAt: true,
          },
        },
        parent: true,
        media: true,
      },
      orderBy: [desc(posts.createdAt)],
    });

    return NextResponse.json(allPosts);
  } catch (err) {
    console.log("POST_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();
    const { content, parentId, media } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!content) {
      return new NextResponse("Content is a required field!", { status: 400 });
    }

    const [post] = await db
      .insert(posts)
      .values({
        userId: user.id,
        content,
        parentId,
      })
      .returning({ id: posts.id });

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST_CREATE_ERROR", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
