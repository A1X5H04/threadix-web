"use server";

import { likes, posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { poolDb, pool } from "@/lib/db";
import { decrement, increment } from "@/lib/queries";
import { and, AnyColumn, eq, sql } from "drizzle-orm";

export async function likePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    return { status: false, error: "Unauthorized" };
  }

  try {
    await poolDb.transaction(async (txn) => {
      await txn.update(posts).set({
        likesCount: increment(posts.likesCount),
      });

      await txn.insert(likes).values({
        postId,
        userId: user.id,
      });
    });

    return { status: true, message: "Liked Post" };
  } catch (err) {
    console.log("LIKE_POST_ERROR", err);
    return { status: false, error: "Unable to like the post" };
  } finally {
    pool.end();
  }
}

export async function dislikePost(postId: string) {
  const { user } = await validateRequest();

  if (!user) {
    return { status: false, error: "Unauthorized" };
  }

  try {
    poolDb.transaction(async (txn) => {
      await txn.update(posts).set({
        likesCount: decrement(posts.likesCount),
      });

      await txn
        .delete(likes)
        .where(and(eq(likes.postId, postId), eq(likes.userId, user.id)));
    });
    return { status: true, data: "Disliked User" };
  } catch (err) {
    console.log("DISLIKE_POST_ERROR", err);
    return { status: false, error: "Unable to dislike the post" };
  } finally {
    pool.end();
  }
}
