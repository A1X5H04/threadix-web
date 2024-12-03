import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { postId } }: { params: { postId: string } }
) {
  const { session, user } = await validateRequest();

  if (!user || !session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const blockedUsers = await db.query.blockedUsers.findMany({
      columns: { blockedUserId: true },
      where: (blockedUser, { eq }) => eq(blockedUser.userId, user.id),
    });

    const postWithoutData = await db.query.posts.findFirst({
      columns: { userId: true },
      where: (post, { eq }) => eq(post.id, postId),
    });

    if (!postWithoutData) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const isBlocked = blockedUsers.some(
      (blockedUser) => blockedUser.blockedUserId === postWithoutData.userId
    );

    if (isBlocked) {
      return redirect(`/users/${postWithoutData.userId}`);
    }

    const post = await db.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, postId),
      with: {
        parentPost: {
          with: {
            user: {
              columns: {
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
