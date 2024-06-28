"use server";

import { eq } from "drizzle-orm";
import * as z from "zod";

import db from "@/lib/db";
import { users } from "@/db/schemas/auth";
import { loginSchema } from "@/types/schemas";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedForm = loginSchema.safeParse(values);

  if (!validatedForm.success) {
    return {
      status: false,
      title: "Invalid Credentials",
      message: "The credentials your provide are invalid!",
    };
  }
  const { email, password } = validatedForm.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return {
      status: false,
      title: "User Does not Exist!",
      message: "The user you are trying to login does not exist!",
      action: {
        title: "Register",
        href: "/register",
      },
    };
  }

  const passwordMatch = await new Argon2id().verify(
    existingUser.password,
    password
  );

  if (!passwordMatch) {
    return {
      status: false,
      title: "Incorrect Credentials!",
      message: "The credentials you provided are incorrect!",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    status: true,
    title: "Welcome Back!",
    message: "You have successfully logged in!",
  };
}
