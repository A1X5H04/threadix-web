import { getLikedPosts } from "@/actions/liked-posts";
import FloatingAddPost from "@/components/floating-add-post";
import PostForm from "@/components/post-form";
import PostList from "@/components/post-list";
import { validateRequest } from "@/lib/auth";

import axios from "axios";
import { likes } from "@/db/schemas/tables";

import useSWR from "swr";
import { InferSelectModel } from "drizzle-orm";
import { getRegisteredVote } from "@/actions/registered-votes";
import PostListSkeleton from "@/components/skeletons/post-list";

export default async function Home({}) {
  const { user } = await validateRequest();

  const likedPosts = await getLikedPosts();
  const registeredVotes = await getRegisteredVote();

  // return <PostListSkeleton />;
  return <PostList user={user} likedPosts={likedPosts.data} registeredVotes />;
}
