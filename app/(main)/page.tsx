import FloatingAddPost from "@/components/floating-add-post";
import PostForm from "@/components/post-form";
import PostList from "@/components/post-list";
import { validateRequest } from "@/lib/auth";

import axios from "axios";

import useSWR from "swr";

export default async function Home({}) {
  const { user } = await validateRequest();

  return (
    <div className="pt-20 w-full h-full">
      <PostList user={user} />
      <FloatingAddPost />
    </div>
  );
}
