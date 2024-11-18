import { redirect } from "next/navigation";
import React from "react";

import { getLikedPosts } from "@/actions/liked-posts";
import { getRegisteredVote } from "@/actions/registered-votes";
import { getRepostedPostsId } from "@/actions/post/repost";

import { PostContextProvider } from "@/context/post";
import Navbar from "@/components/navbar";
import CreatePostDialog from "@/components/dialogs/post";
import { validateRequest } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

async function MainLayout({ children }: Props) {
  const { session, user } = await validateRequest();

  if (!session || !user) return redirect("/login");

  try {
    const likedPosts = await getLikedPosts();
    const registeredVotes = await getRegisteredVote();
    const repostedPostsId = await getRepostedPostsId();

    // return <PostListSkeleton />;
    return (
      <PostContextProvider
        likedPosts={likedPosts}
        repostedPosts={repostedPostsId}
        registeredVotes={registeredVotes.data}
        currentUser={user}
      >
        <main className="relative max-w-2xl mx-auto px-5 w-full h-full">
          <Navbar user={user} />
          <div className="pt-20 w-full h-full">{children}</div>
          <CreatePostDialog user={user} />
        </main>
      </PostContextProvider>
    );
  } catch (err) {
    return <div>Error loading posts</div>;
  }
}

export default MainLayout;
