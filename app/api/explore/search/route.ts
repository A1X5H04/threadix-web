import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { user } = await validateRequest();
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!user) {
    return new NextResponse("Unauthenticated");
  }

  if (!query?.trim()) {
    return NextResponse.json({ matchedPosts: [] });
  }

  const postList = await db.query.posts.findMany({
    where: (post, { sql }) =>
      sql`to_tsvector('english', ${post.content}) @@ plainto_tsquery('english', ${query})`,
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          isVerified: true,
        },
      },
      // This are only to show the user if the replies has a poll or media
      replies: {
        where: (reply, { eq }) => eq(reply.userId, posts.userId),
        columns: {
          id: true,
        },
        with: {
          poll: {
            columns: {
              id: true,
            },
          },
          media: {
            columns: {
              postId: true,
            },
          },
        },
        orderBy: (reply, { asc }) => asc(reply.createdAt),
        limit: 1,
      },
      quotePost: {
        columns: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          mentions: true,
        },
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              isVerified: true,
              createdAt: true,
            },
          },
          media: true,
          poll: {
            with: {
              poll_options: {
                orderBy: (option, { asc }) => asc(option.id),
              },
            },
          },
          quotePost: {
            columns: {
              id: true,
              content: true,
            },
            with: {
              user: {
                columns: {
                  id: true,
                  username: true,
                },
              },
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
    },
  });

  return NextResponse.json({ matchedPosts: postList });
}
