import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const tagData = await db.query.tags.findFirst({
    where: (tag, { eq, or }) =>
      or(eq(tag.id, params.tagId), eq(tag.name, params.tagId)),
    columns: {
      id: true,
      name: true,
      createdAt: true,
    },
    with: {
      user: {
        columns: {
          avatar: true,
          username: true,
        },
      },
    },
  });

  if (!tagData) {
    return new NextResponse("Tag not found", { status: 404 });
  }

  const postData = await db.query.postsTags.findMany({
    where: (tag, { eq }) => eq(tag.tagId, tagData.id),
    columns: {},
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
      },
    },
  });

  const formattedPosts = postData.map((post) => {
    return {
      ...post.post,
    };
  });

  return NextResponse.json({ tag: tagData, posts: formattedPosts });
}
