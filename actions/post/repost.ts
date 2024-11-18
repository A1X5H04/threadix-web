"use server";

import { reposts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function repost(postId: string) {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.insert(reposts).values({
    postId,
    userId: session.userId,
  });
}

export async function unRepost(postId: string) {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.delete(reposts).where(eq(reposts.postId, postId));
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
