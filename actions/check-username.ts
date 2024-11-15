"use server";

import { users } from "@/db/schemas/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function checkUsername(username: string) {
  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existing) {
    throw new Error("Username is already taken!");
  }
}
