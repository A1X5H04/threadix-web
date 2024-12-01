import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const activities = await db.query.activityFeed.findMany({
    where: (activity, { eq }) => eq(activity.userId, user.id),
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
  const activitiesWithActionUsers = activities.map((activity) => ({
    ...activity,
    actionUsers: activity.actionUserIds.map((userId) =>
      actionUsersMap.get(userId)
    ),
  }));

  return NextResponse.json(activitiesWithActionUsers);
}
