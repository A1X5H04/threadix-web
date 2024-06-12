"use server";

import { users } from "@/db/schemas/auth";
import db from "@/lib/db";
import { registerSchema } from "@/types/auth";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

import { Argon2id } from "oslo/password";
import * as z from "zod";

export async function register(formValues: z.infer<typeof registerSchema>) {
  const validatedForm = registerSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return {
      status: false,
      title: "Invalid Credentials",
      message: "The credentials your provide are invalid!",
    };
  }

  try {
    const { name, username, email, password } = validatedForm.data;

    const hashedPassword = await new Argon2id().hash(password);

    const userId = generateId(15);

    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingEmail) {
      return {
        status: false,
        title: "User exists!",
        message: `The user with this email ${email} exists`,
      };
    }

    await db.insert(users).values({
      id: userId,
      name,
      username,
      email,
      password: hashedPassword,
    });
    return {
      status: true,
      title: "User Created Succesfully!",
      message: `Please login with ${username} to continue..`,
    };
  } catch (err) {
    return {
      status: false,
      title: "Something went wrong!",
      message: "Check browser console for more info",
    };
  }
}
