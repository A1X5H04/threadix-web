import PostForm from "@/components/post-form";
import PostItem from "@/components/post-item";
import { posts } from "@/db/schemas/tables";
import { validateRequest } from "@/lib/auth";

import axios from "axios";

import useSWR from "swr";

type Post = {
  id: string;
  content: string;
  parentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Home({}) {
  const { user } = await validateRequest();

  // const { data, error, isLoading } = useSWR("/api/post", (url) =>
  //   axios.get(url).then((res) => res.data)
  // );

  // if (error) {
  //   return <div>Error</div>;
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="space-y-5">
      <PostForm user={user} />
      {/* {data?.map((post: Post) => (
      <PostItem key={post.id} data={post} />
      ))} */}
      Hello World
    </div>
  );
}
