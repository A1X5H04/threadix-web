import { getLikedPosts } from "@/actions/liked-posts";
import FloatingAddPost from "@/components/floating-add-post";
import PostForm from "@/components/post-form";
import PostList from "@/components/post-list";
import { validateRequest } from "@/lib/auth";

import axios from "axios";
import { likes } from "@/db/schemas/tables";

import useSWR from "swr";
import { InferSelectModel } from "drizzle-orm";

export default async function Home({}) {
  const { user } = await validateRequest();

  const likedPosts = await getLikedPosts();

  return <PostList user={user} likedPosts={likedPosts.data} />;
}
