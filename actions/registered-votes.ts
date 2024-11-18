"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getRegisteredVote() {
  const { user } = await validateRequest();

  if (!user)
    return {
      status: false,
      message: "Unauthorized",
    };

  try {
    const registeredVotes = await db.query.votes.findMany({
      columns: {
        pollId: true,
        optionId: true,
      },
      where: (vote, { eq }) => eq(vote.userId, user.id),
    });

    return {
      status: true,
      message: "Post Data",
      data: registeredVotes.map((vote) => ({
        pollId: vote.pollId,
        optionId: vote.optionId,
      })),
    };
  } catch (err) {
    console.log("Error checking if post is liked", err);
    return {
      status: false,
      message: "An error occurred",
    };
  }
}
