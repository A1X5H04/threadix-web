"use server";

import { eq } from "drizzle-orm";
import * as z from "zod";

import { db } from "@/lib/db";
import { users } from "@/db/schemas/auth";
import { loginSchema } from "@/types/schemas";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedForm = loginSchema.safeParse(values);

  if (!validatedForm.success) {
    throw new Error("Invalid form data");
  }
  const { email, password } = validatedForm.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser || !existingUser.password) {
    throw new Error("User does not exist!");
  }

  const passwordMatch = await new Argon2id().verify(
    existingUser.password,
    password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials!");
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return "Welcome back!";
}
