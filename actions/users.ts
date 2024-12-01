"use server";

import { activityFeed, userFollowers } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { containsInArray } from "@/lib/queries";
import { and, arrayContains, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { user, session } = await validateRequest();

  if (!session || !user) return redirect("/login");

  return user;
}

export async function getUsers() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const otherUsers = await db.query.users.findMany({
    where: (dbUser, { ne }) => ne(dbUser.id, user.id),
    columns: {
      name: true,
      username: true,
      avatar: true,
    },
  });

  return otherUsers;
}

export async function followUser(username: string) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const userExist = await db.query.users.findFirst({
    where: (dbUser, { eq }) => eq(dbUser.username, username),
    columns: { id: true },
  });

  if (!userExist) throw new Error("User not found");

  await db.insert(userFollowers).values({
    followerId: user.id, // The user who is following the other user
    userId: userExist.id, // The user who is being followed
  });

  await db.insert(activityFeed).values({
    userId: userExist.id,
    actionUserIds: [user.id],
    activityType: "user",
    title: `${user.name} just followed you!`,
  });
}

export async function unfollowUser(username: string) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const userExist = await db.query.users.findFirst({
    where: (dbUser, { eq }) => eq(dbUser.username, username),
    columns: { id: true },
  });

  if (!userExist) throw new Error("User not found");

  await db
    .delete(userFollowers)
    .where(
      and(
        eq(userFollowers.followerId, user.id),
        eq(userFollowers.userId, userExist.id)
      )
    );

  await db
    .delete(activityFeed)
    .where(
      and(
        eq(activityFeed.userId, userExist.id),
        containsInArray(activityFeed.actionUserIds, user.id),
        eq(activityFeed.activityType, "user")
      )
    );
}

export async function getFollowingUsers() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const followingUsers = await db.query.userFollowers.findMany({
    where: (follower, { eq }) => eq(follower.followerId, user.id),
    with: {
      following_user: {
        columns: {
          username: true,
        },
      },
    },
  });

  return followingUsers.map((following) => following.following_user.username);
}

export async function hasUnreadActivity() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const hasUnreadActivity = await db.query.activityFeed.findFirst({
    where: (activity, { eq }) =>
      and(eq(activity.userId, user.id), eq(activity.isUnread, true)),
    columns: { id: true },
  });

  return !!hasUnreadActivity;
}

export async function readAllActivity() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  await db
    .update(activityFeed)
    .set({ isUnread: false })
    .where(eq(activityFeed.userId, user.id));
}
