"use server";

import { activityFeed, reposts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { containsInArray } from "@/lib/queries";
import { and, eq } from "drizzle-orm";

export async function repost(postId: string, postUserId: string) {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.insert(reposts).values({
    postId,
    userId: session.userId,
  });

  await db.insert(activityFeed).values({
    actionUserIds: [session.userId],
    userId: postUserId,
    postId,
    activityType: "repost",
    title: "Just reposted your post",
  });
}

export async function unRepost(postId: string, postUserId: string) {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.insert(activityFeed).values({
    actionUserIds: [session.userId],
    userId: postUserId,
    postId,
    activityType: "repost",
    title: "Just reposted your post",
  });

  await db.delete(reposts).where(eq(reposts.postId, postId));

  await db
    .delete(activityFeed)
    .where(
      and(
        eq(activityFeed.userId, postUserId),
        containsInArray(activityFeed.actionUserIds, session.userId),
        eq(activityFeed.activityType, "repost")
      )
    );
}

export async function getRepostedPostsId() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const repostedPosts = await db.query.reposts.findMany({
    columns: {
      postId: true,
    },
    where(fields, { eq }) {
      return eq(fields.userId, session.userId);
    },
  });

  return repostedPosts.map((repost) => repost.postId);
}
