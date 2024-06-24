import React from "react";
import Image from "next/image";
import PostVoiceRecording from "./post-voice-rec";

function PostContent({ content }: { content: string }) {
  return (
    <div>
      <p className="pb-2">{content}</p>
      <PostVoiceRecording />
      <div className="relative w-full h-72 my-2">
        <Image
          className="rounded-lg object-cover"
          src="https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Post Image"
        />
      </div>
    </div>
  );
}

export default PostContent;
