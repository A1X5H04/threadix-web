"use server";

import { userFollowers } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
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
