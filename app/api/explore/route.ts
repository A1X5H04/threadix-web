import { posts, userFollowers } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { desc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// This is a pretty naive implementation of the explore api, but it can be improved, let me know by creating a PR :)

export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const postTagsWithTagId = await db.query.postsTags.findMany({
    columns: {
      tagId: true,
    },
  });

  const followersWithUserId = await db.query.userFollowers.findMany({
    columns: {
      userId: true,
    },
  });

  const tagsCount = postTagsWithTagId.reduce(
    (acc: { [key: string]: number }, postTags) => {
      acc[postTags.tagId] = (acc[postTags.tagId] || 0) + 1;
      return acc;
    },
    {}
  );

  const followsCount = followersWithUserId.reduce(
    (acc: { [key: string]: number }, follower) => {
      acc[follower.userId] = (acc[follower.userId] || 0) + 1;
      return acc;
    },
    {}
  );

  const popularPosts = await db.query.posts.findMany({
    where: (post, { ne }) => ne(post.userId, user.id),
    with: {
      user: {
        columns: {
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
              name: true,
              username: true,
              avatar: true,
              isVerified: true,
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
    orderBy: (post, { desc }) => desc(post.likesCount),
    limit: 3,
  });

  /*
    Here's how we can query recommended users:
    1. get following users of the current user
    2. get the users from the following users that the current user is not following
    3. get the users that has the most followers
  */

  const followingUsers = await db.query.userFollowers
    .findMany({
      where: (follower, { eq }) => eq(follower.followerId, user.id),
      with: {
        following_user: {
          columns: {
            id: true,
          },
        },
      },
    })
    .then((followers) =>
      followers.map((follower) => follower.following_user.id)
    );

  const recommendedUsers = await db.query.users.findMany({
    where: (dbUser, { ne, and, notInArray }) =>
      and(ne(dbUser.id, user.id), notInArray(dbUser.id, followingUsers)),
  });

  const popularUsers = await db.query.users
    .findMany({
      where: (dbUser, { ne, and, inArray }) =>
        and(
          ne(dbUser.id, user.id),
          inArray(dbUser.id, Object.keys(followsCount))
        ),
    })
    .then((users) =>
      users
        .map((u) => ({ ...u, followersCount: followsCount[u.id] }))
        .filter((u) => u.followersCount > 0)
        .sort((a, b) => b.followersCount - a.followersCount)
    );

  const trendingTags = await db.query.tags
    .findMany({
      where: (tag, { inArray }) => inArray(tag.id, Object.keys(tagsCount)),
      with: {
        user: {
          columns: {
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
      limit: 10,
    })
    .then((tags) =>
      tags.map((tag) => ({ ...tag, postsCount: tagsCount[tag.id] }))
    );

  return NextResponse.json({
    popularPosts,
    recommendedUsers,
    popularUsers,
    trendingTags,
  });
}
