import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function UserIdPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  } else if (user.username === username) {
    redirect("/me");
  }

  return <div>UserIdPage</div>;
}

export default UserIdPage;
