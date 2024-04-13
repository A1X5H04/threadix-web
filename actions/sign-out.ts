"use server";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  const { session } = await validateRequest();

  if (!session) {
    return {
      status: false,
      title: "Unauthorized",
      message: "You are not authorized to perform this action",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/login");
}
