"use server";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { user, session } = await validateRequest();

  if (!session || !user) return redirect("/login");

  return user;
}

export async function getUsers() {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");

  const otherUsers = await db.query.users.findMany({
    where: (dbUser, { ne }) => ne(dbUser.id, user.id),
    columns: {
      name: true,
      username: true,
      avatar: true,
    },
  });

  return otherUsers;
}
