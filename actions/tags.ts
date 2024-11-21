"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getTags() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const tags = await db.query.tags.findMany({ columns: { name: true } });

  return tags.map((tag) => tag.name);
}
