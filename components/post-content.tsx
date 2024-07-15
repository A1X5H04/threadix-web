import React from "react";
import Image from "next/image";
import PostMedia from "./post-media";
import PostRecording from "./audio-player";

function PostContent({ content }: { content: string }) {
  return (
    <div>
      <p className="pb-5">{content}</p>
      <div className="grid place-items-center w-full h-52 rounded-lg">
        <PostRecording />
      </div>
      {/* <PostMedia /> */}
    </div>
  );
}

export default PostContent;
