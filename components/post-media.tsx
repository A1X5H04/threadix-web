"use client";

import { RiFilmLine, RiImage2Line } from "@remixicon/react";
import React from "react";
import Image from "next/image";

import { VoiceVisualizer, useVoiceVisualizer } from "react-voice-visualizer";
import PostRecording from "./post-recording";
import { Separator } from "./ui/separator";

function PostMedia() {
  //   const recorderControls = useVoiceVisualizer();

  return (
    <div className="w-full space-y-2">
      <PostRecording />
      {/* <Separator />
      <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          <RiFilmLine className="w-3 h-3 text-muted-foreground" />
          <p>Shared some media</p>
        </span>
      </div> */}

      <div className="relative w-full h-72 my-2 bg-muted rounded-lg overflow-hidden">
        <Image
          className="object-cover"
          src="https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          alt="Post Image"
        />
      </div>
    </div>
  );
}

export default PostMedia;

{
  /* <div className="relative w-full h-72 my-2 bg-muted rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            src="https://images.unsplash.com/photo-1542397284385-6010376c5337?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill
            alt="Post Image"
          />
        </div> */
}
