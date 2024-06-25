import React from "react";
import Image from "next/image";
import PostMedia from "./post-media";
import PostRecording from "./post-recording";

function PostContent({ content }: { content: string }) {
  return (
    <div>
      <p className="pb-2">{content}</p>
      <PostMedia />
    </div>
  );
}

export default PostContent;
