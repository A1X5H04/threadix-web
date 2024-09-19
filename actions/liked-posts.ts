"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getLikedPosts() {
  const { user } = await validateRequest();

  if (!user)
    return {
      status: false,
      message: "Unauthorized",
    };

  try {
    const likedPost = await db.query.likes.findMany({
      where: (like, { eq }) => eq(like.userId, user.id),
    });

    return {
      status: true,
      message: "Post Data",
      data: likedPost.map((like) => like.postId),
    };
  } catch (err) {
    console.log("Error checking if post is liked", err);
    return {
      status: false,
      message: "An error occurred",
    };
  }
}
