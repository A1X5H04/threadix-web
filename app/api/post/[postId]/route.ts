import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } }
) {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("POSTID_GET", postId);

  try {
    const post = await db.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, postId),
      with: {
        likes: {
          with: {
            user: {
              columns: {
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        media: true,
        poll: {
          with: {
            poll_options: true,
          },
        },
        replies: {
          orderBy: (reply, { asc }) => asc(reply.createdAt),
        },
        user: {
          columns: {
            id: true,
            name: true,
            username: true,
            bio: true,
            isVerified: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (err) {
    console.log("POSTID_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
