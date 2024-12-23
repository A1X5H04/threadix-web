import { validateRequest } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const { session, user } = await validateRequest();

  if (!session || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const likedPosts = await db.query.likes.findMany({
    where: (post, { eq }) => eq(post.userId, user.id),
    orderBy: (post, { desc }) => desc(post.createdAt),
    with: {
      post: {
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
      },
    },
  });

  return NextResponse.json(likedPosts.map((like) => ({ ...like.post })));
}
