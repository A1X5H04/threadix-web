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
        quotePost: {
          columns: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            mentions: true,
            tags: true,
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
                poll_options: true,
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
        user: {
          columns: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            isVerified: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const replies = await db.query.posts.findMany({
      where: (post, { eq }) => eq(post.parentId, postId),
      with: {
        media: true,
        poll: {
          with: {
            poll_options: true,
          },
        },
        replies: {
          where: (reply, { eq, or }) =>
            or(eq(reply.userId, post.userId), eq(reply.userId, reply.userId)),
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
            media: true,
            poll: {
              with: {
                poll_options: true,
              },
            },
          },
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
      orderBy: (reply, { desc }) => [desc(reply.createdAt)],
    });

    return NextResponse.json({ post, replies });
  } catch (err) {
    console.log("POSTID_GET_ERROR", err);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
