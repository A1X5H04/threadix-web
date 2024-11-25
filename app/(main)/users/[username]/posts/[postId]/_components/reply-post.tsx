"use client";

import React, { useContext } from "react";

import { DetailPost } from "@/types/api-responses/post/single";

import ReplyPostItem from "./reply-post-item";

type Props = {
  data: DetailPost;
  parentPostUserId: string;
};

function PostItem({ data, parentPostUserId }: Props) {
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
            isOriginalPoster={reply.userId === data.userId}
            showReplyBar={index !== data.replies.length - 1}
          />
        ))}
    </div>
  );
}

export default PostItem;
