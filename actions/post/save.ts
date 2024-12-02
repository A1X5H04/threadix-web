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
