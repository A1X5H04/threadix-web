"use server";

import { pollOptions, votes } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";
import { pool, poolDb } from "@/lib/db";
import { increment } from "@/lib/queries";
import { eq } from "drizzle-orm";

export async function registerVote(pollId: string, optionId: number) {
  const { user } = await validateRequest();

  if (!user) {
    return { status: false, error: "Unauthorized" };
  }

  await poolDb.transaction(async (txn) => {
    await txn
      .update(pollOptions)
      .set({
        voteCount: increment(pollOptions.voteCount),
      })
      .where(eq(pollOptions.id, optionId));

    await txn.insert(votes).values({
      pollId,
      optionId,
      userId: user.id,
    });

    return { status: true, message: "Voted" };
  });
}
