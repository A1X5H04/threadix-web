"use server";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { user, session } = await validateRequest();

  if (!session || !user) return redirect("/login");

  return user;
}
