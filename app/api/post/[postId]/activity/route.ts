import { repost } from "@/actions/post/repost";
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
    columns: {
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          username: true,
          avatar: true,
          isVerified: true,
        },
      },
    },
  });

  const reposts = await db.query.reposts.findMany({
    where: (repost, { eq }) => eq(repost.postId, postId),
    columns: {
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          username: true,
          avatar: true,
          isVerified: true,
        },
      },
    },
  });

  const quotedPosts = await db.query.posts.findMany({
    where: (post, { eq }) => eq(post.quotePostId, postId),
    columns: {
      content: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          username: true,
          avatar: true,
          isVerified: true,
        },
      },
    },
  });

  return NextResponse.json({
    likes: likes.map((like) => ({ ...like, type: "like" })),
    reposts: reposts.map((repost) => ({ ...repost, type: "repost" })),
    quotedPosts: quotedPosts.map((post) => ({ ...post, type: "quote" })),
  });
}
