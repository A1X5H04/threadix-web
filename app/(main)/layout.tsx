import { redirect } from "next/navigation";
import React from "react";

import { getLikedPosts } from "@/actions/liked-posts";
import { getRegisteredVote } from "@/actions/registered-votes";
import { getRepostedPostsId } from "@/actions/post/repost";

import Navbar from "@/components/navbar";
import CreatePostDialog from "@/components/dialogs/post";
import { validateRequest } from "@/lib/auth";
import DataFetcher from "@/components/data-fetcher";

interface Props {
  children: React.ReactNode;
}

async function MainLayout({ children }: Props) {
  const { session, user } = await validateRequest();

  if (!session || !user) return redirect("/login");

  console.log("This will work on any page that uses the MainLayout component");

  return (
    <main className="relative max-w-2xl mx-auto px-5 w-full h-full">
      <Navbar user={user} />
      <DataFetcher>{children}</DataFetcher>
      <CreatePostDialog user={user} />
    </main>
  );
}

export default MainLayout;
