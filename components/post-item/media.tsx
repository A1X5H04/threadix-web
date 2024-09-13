import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";

function PostMedia({
  media,
}: {
  media: {
    postId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    type: string;
    createdAt: string;
  }[];
}) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  return (
    <div className="overflow-hidden mb-4 w-full" ref={emblaRef}>
      <div className="flex flex-nowrap gap-x-2 w-full max-h-80">
        {media.map((mediaItem, index) => (
          <div
            key={mediaItem.url}
            className={cn(
              "relative w-full flex-shrink-0 max-h-72",
              Math.round(mediaItem.width / mediaItem.height) >= 2
                ? "basis-96"
                : mediaItem.width / mediaItem.height >= 1
                ? "basis-60"
                : "basis-40"
            )}
          >
            {mediaItem.type === "video" ? (
              <video
                src={mediaItem.url}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  width={mediaItem.width}
                  height={mediaItem.height}
                  src={mediaItem.url}
                  alt={mediaItem.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostMedia;
