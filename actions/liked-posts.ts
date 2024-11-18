"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getLikedPosts() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const likedPost = await db.query.likes.findMany({
    columns: {
      postId: true,
    },
    where: (like, { eq }) => eq(like.userId, session.userId),
  });

  return likedPost.map((like) => like.postId);
}
