import React from "react";
import Image from "next/image";
import PostMedia from "./post-media";
import PostRecording from "./audio-player";

function PostContent({ content }: { content: string }) {
  return (
    <div>
      <p className="pb-5">{content}</p>
      <PostMedia />
    </div>
  );
}

export default PostContent;
