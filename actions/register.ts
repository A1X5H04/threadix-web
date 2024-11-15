"use server";

import { users } from "@/db/schemas/auth";
import { db } from "@/lib/db";
import { registerSchema } from "@/types/schemas";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

import { Argon2id } from "oslo/password";
import * as z from "zod";

export async function register(formValues: z.infer<typeof registerSchema>) {
  const validatedForm = registerSchema.safeParse(formValues);

  if (!validatedForm.success) {
    throw new Error("Invalid form data");
  }
  const { name, username, email, password } = validatedForm.data;

  const hashedPassword = await new Argon2id().hash(password);

  const userId = generateId(15);

  const existingEmail = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingEmail) {
    throw new Error("Email is already taken!");
  }

  await db.insert(users).values({
    id: userId,
    name,
    username,
    email,
    password: hashedPassword,
  });
  return "User registered successfully!";
}
