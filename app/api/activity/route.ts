import { activityFeed } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { notInArrayForArray } from "@/lib/queries";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const mutedUsers = await db.query.mutedUsers.findMany({
    columns: { mutedUserId: true },
    where: (mutedUser, { eq }) => eq(mutedUser.userId, user.id),
  });

  const blockedUsers = await db.query.blockedUsers.findMany({
    columns: { blockedUserId: true },
    where: (blockedUser, { eq }) => eq(blockedUser.userId, user.id),
  });

  const activities = await db.query.activityFeed.findMany({
    where: (activity, { and, eq, notInArray }) =>
      and(
        eq(activity.userId, user.id),
        notInArrayForArray(
          activity.actionUserIds,
          mutedUsers.map((mutedUser) => mutedUser.mutedUserId)
        ),
        notInArrayForArray(
          activity.actionUserIds,
          blockedUsers.map((blockedUser) => blockedUser.blockedUserId)
        )
      ),
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

  const allActionUserIds = Array.from(
    new Set(activities.flatMap((activity) => activity.actionUserIds))
  );

  const actionUsers = await db.query.users.findMany({
    where: (user, { inArray }) => inArray(user.id, allActionUserIds),
    columns: {
      id: true,
      username: true,
      avatar: true,
      isVerified: true,
    },
  });

  // Map actionUserIds to user objects
  const actionUsersMap = new Map(actionUsers.map((user) => [user.id, user]));

  // Attach actionUsers to activities
  const activitiesWithActionUsers = activities
    .map((activity) => ({
      ...activity,
      actionUsers: activity.actionUserIds.map((userId) =>
        actionUsersMap.get(userId)
      ),
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Mark all activities as read
  const hasUnreadActivity = activitiesWithActionUsers.some(
    (activity) => activity.isUnread
  );

  if (hasUnreadActivity) {
    await db
      .update(activityFeed)
      .set({
        isUnread: false,
      })
      .where(eq(activityFeed.userId, user.id));
  }

  return NextResponse.json(activitiesWithActionUsers);
}
