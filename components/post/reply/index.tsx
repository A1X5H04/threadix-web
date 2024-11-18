"use client";

import React, { useContext } from "react";

import Link from "next/link";

import { PostContext } from "@/context/post";
import { Post } from "@/types/api-response";

import ReplyPostItem from "./item";

type Props = {
  data: Post;
  parentPostUserId: string;
};

function PostItem({ data, parentPostUserId }: Props) {
  const { currentUser, likedPosts } = useContext(PostContext);

  //   const isRepliedByCurrentUser =
  //     data.replies.length > 0 && data.replies[0].userId === currentUser?.id;

  //   const isRepliesHasMedia = data.replies.some(
  //     (reply) => (reply.media && reply.media.length > 0) || reply.poll
  //   );

  return (
    <div className="py-2 border-b">
      <ReplyPostItem data={data} showReplyBar={data.replies.length > 0} />
      {data.replies.length > 0 &&
        data.replies.map((reply, index) => (
          <ReplyPostItem
            key={reply.id}
            data={reply}
            showReplyBar={index !== data.replies.length - 1}
          />
        ))}
    </div>
  );
}

export default PostItem;
