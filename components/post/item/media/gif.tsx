import { PostMediaSchema } from "@/types";
import React from "react";
import Image from "next/image";

interface PostMediaGifProps {
  media: PostMediaSchema;
  onClick: () => void;
}

function PostMediaGif({ media, onClick }: PostMediaGifProps) {
  return (
    <div
      data-prevent-nprogress
      onClick={(e) => {
        e.preventDefault();
        onClick()
      }}
      className="relative w-fit bg-background flex justify-center items-center overflow-hidden rounded-md border border-muted mb-4"
    >
      <Image
        unoptimized
        width={media.width}
        height={media.height}
        src={media.url}
        alt={media.name}
        className="object-contain max-h-80"
      />
      <span className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 backdrop-blur-md text-white text-xs rounded-md font-semibold">
        GIF
      </span>
    </div>
  );
}

export default PostMediaGif;
