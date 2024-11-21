import { redirect } from "next/navigation";
import React from "react";

import { getLikedPosts } from "@/actions/liked-posts";
import { getRegisteredVote } from "@/actions/registered-votes";
import { getRepostedPostsId } from "@/actions/post/repost";

import Navbar from "@/components/navbar";
import CreatePostDialog from "@/components/dialogs/post";
import { validateRequest } from "@/lib/auth";
import { useAppStore } from "@/hooks/use-store";

interface Props {
  children: React.ReactNode;
}

async function MainLayout({ children }: Props) {
  const { session, user } = await validateRequest();

  if (!session || !user) return redirect("/login");

  // return <PostListSkeleton />;
  return (
    <main className="relative max-w-2xl mx-auto px-5 w-full h-full">
      <Navbar user={user} />
      <div className="pt-20 w-full h-full">{children}</div>
      <CreatePostDialog user={user} />
    </main>
  );
}

export default MainLayout;
