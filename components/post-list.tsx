"use client";
import React from "react";
import useSWR from "swr";

import PostItem from "./post-item/index";
import { RiLoader2Line } from "@remixicon/react";
import { GET } from "@/lib/fetcher";
import { postData } from "@/data";

type Post = {
  id: string;
  content: string;
  parentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

function PostList({ user }: { user: any }) {
  // const { data, error, isLoading } = useSWR("/api/post", GET, {
  //   revalidateOnFocus: false,
  // });

  // if (isLoading)
  //   return (
  //     <div className="w-full h-72 grid place-items-center">
  //       <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
  //     </div>
  //   );

  // if (error) {
  //   return (
  //     <div className="w-full h-72 grid place-items-center">
  //       <div className="inline-flex flex-col gap-y-6 items-center justify-center">
  //         <RiSignalWifiErrorFill className="w-12 h-12 text-gray-500" />
  //         <span className="text-center">
  //           <h3 className="text-2xl font-bold">Failed to fetch posts</h3>
  //           <p className="text-sm mt-2 text-muted-foreground">
  //             Refreshing the page might help
  //           </p>
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <PostItem data={postData[0]} />
    // <h1>{JSON.stringify(data)}</h1>
    // <div className="space-y-5 my-3">
    //   {data?.map((post: Post) => (
    //     <PostItem key={post.id} data={post} user={user} />
    //   ))}
    // </div>
    // <PostItem
    //   data={{
    //     id: "1",
    //     content: "Enternalzz just posted a new banger!",
    //     parentId: "1",
    //     poll: {
    //       question: "Slayashi! What's your favorite color?",
    //       options: [
    //         { title: "Red" },
    //         { title: "Blue" },
    //         { title: "Green" },
    //         { title: "Yellow" },
    //       ],
    //       duration: "1h",
    //       anonymousVoting: false,
    //       multipleAnswers: false,
    //       quizMode: true,
    //     },
    //     user: {
    //       id: "1",
    //       name: "John Doe",
    //       username: "johndoe",
    //       email: "asdf",
    //     },
    //     createdAt: "2021-10-05T00:00:00Z",
    //     updatedAt: "2021-10-05T00:00:00Z",
    //   }}
    //   user={user}
    // />
  );
}

export default PostList;
