"use server";
import { users } from "@/db/schema";
import db from "@/lib/db";
import { registerSchema } from "@/types";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import * as z from "zod";

export default async function register(
  formValues: z.infer<typeof registerSchema>
) {
  const validatedForm = registerSchema.safeParse(formValues);

  if (!validatedForm.success) {
    return {
      status: false,
      title: "Invalid Credentials",
      message: "The credentials your provide are invalid!",
    };
  }

  console.log(validatedForm);
  const { name, username, email, password } = validatedForm.data;

  const hashedPassword = await new Argon2id().hash(password);

  const userId = generateId(15);

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
}
