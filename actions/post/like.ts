"use server";

import { likes, posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { poolDb, pool, db } from "@/lib/db";
import { decrement, increment } from "@/lib/queries";
import { and, eq } from "drizzle-orm";

export async function likePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    return { status: false, error: "Unauthorized" };
  }

  await poolDb.transaction(async (txn) => {
    await txn
      .update(posts)
      .set({
        likesCount: increment(posts.likesCount),
      })
      .where(eq(posts.id, postId));

    await txn.insert(likes).values({
      postId,
      userId: user.id,
    });
  });

  return { status: true, message: "Liked Post" };

  // console.log("LIKE_POST_ERROR", err);
  // return { status: false, error: "Unable to like the post" };
}

export async function dislikePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    return { status: false, error: "Unauthorized" };
  }

  poolDb.transaction(async (txn) => {
    await txn
      .update(posts)
      .set({
        likesCount: decrement(posts.likesCount),
      })
      .where(eq(posts.id, postId));

    await txn
      .delete(likes)
      .where(and(eq(likes.postId, postId), eq(likes.userId, user.id)));
  });
  return { status: true, data: "Disliked User" };

  // console.log("DISLIKE_POST_ERROR", err);
  // return { status: false, error: "Unable to dislike the post" };
}

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
