"use server";

import { users } from "@/db/schemas/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function checkUsername(username: string) {
  if (username === "me") {
    return {
      status: false,
      message: "me is a reserved word, try another one!",
    };
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existing) {
    return {
      status: false,
      message: username + " is already taken, try another one!",
    };
  }

  return {
    status: true,
    message: username + " is available!",
  };
}
