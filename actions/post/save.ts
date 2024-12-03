"use server";

import { savedPosts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

export async function savePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.insert(savedPosts).values({
    userId: user.id,
    postId,
  });
}

export async function unSavePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(savedPosts)
    .where(and(eq(savedPosts.postId, postId), eq(savedPosts.userId, user.id)));
}

export async function getSavedPosts() {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return db.query.savedPosts
    .findMany({
      columns: { postId: true },
      where: (savedPost, { eq }) => eq(savedPost.userId, user.id),
    })
    .then((savedPosts) => savedPosts.map((post) => post.postId));
}
