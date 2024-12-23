import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { profileId: string } },
) {
  const { user } = await validateRequest();

  if (!user) return NextResponse.redirect("/login");

  const userExist = await db.query.users.findFirst({
    where: (dbUser, { eq }) => eq(dbUser.username, params.profileId),
    columns: { id: true },
  });

  if (!userExist) return new NextResponse("No User Found!", { status: 404 });

  const posts = await db.query.posts.findMany({
    where: (post, { eq, and, isNull }) =>
      and(eq(post.userId, userExist.id), isNull(post.parentId)),
    orderBy: (post, { desc }) => desc(post.createdAt),
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
        where: (reply, { eq }) => eq(reply.userId, userExist.id),
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

  const reposts = await db.query.reposts.findMany({
    where: (repost, { eq }) => eq(repost.userId, userExist.id),
    orderBy: (repost, { desc }) => desc(repost.createdAt),
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
        },
      },
      user: {
        columns: {
          id: true,
          username: true,
        },
      },
    },
  });

  const replies = await db.query.posts.findMany({
    where: (post, { eq, and, isNotNull }) =>
      and(eq(post.userId, userExist.id), isNotNull(post.parentId)),
    orderBy: (reply, { desc }) => desc(reply.createdAt),
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
    },
  });

  return NextResponse.json({
    posts,
    reposts: reposts.map((repost) => ({
      ...repost.post,
      isReposted: true,
      repostedBy: {
        id: repost.user.id,
        username: repost.user.username,
      },
      repostedAt: repost.createdAt,
    })),
    replies,
  });
}
