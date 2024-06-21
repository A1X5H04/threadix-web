import PostForm from "@/components/post-form";
import PostItem from "@/components/post-item";
import PostList from "@/components/post-list";
import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";

import axios from "axios";

import useSWR from "swr";

export default async function Home({}) {
  const { user } = await validateRequest();

  return (
    <>
      <PostForm user={user} />
      <PostList user={user} />
    </>
  );
}
