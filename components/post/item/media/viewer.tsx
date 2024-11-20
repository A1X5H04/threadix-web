import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

import Lightbox from "yet-another-react-lightbox-lite";
import "yet-another-react-lightbox-lite/styles.css";

import { PostMediaSchema } from "@/types";
import { calculateSlideDimensions } from "@/lib/utils";

interface MediaViewerProps {
  media: PostMediaSchema[];
  mediaIndex: number | undefined;
  setMediaIndex: Dispatch<SetStateAction<number | undefined>>;
}

function MediaViewer({ media, mediaIndex, setMediaIndex }: MediaViewerProps) {
  console.log(mediaIndex);

  return (
    <Lightbox
      slides={media.map((mediaItem) => ({
        src: mediaItem.url,
        alt: mediaItem.name,
        height: mediaItem.height,
        width: mediaItem.width,
      }))}
      toolbar={{
        fixed: true,
      }}
      render={{
        slide: ({ slide, rect }) => {
          const { width, height } = calculateSlideDimensions(rect, slide);
          if (
            media[mediaIndex ?? 0].type === "image" ||
            media[mediaIndex ?? 0].type === "gif"
          ) {
            return (
              <Image
                src={slide.src}
                alt={slide.alt || ""}
                width={width}
                height={height}
                loading="eager"
                className="rounded-md"
                draggable={false}
                blurDataURL={(slide as any).blurDataURL}
                style={{
                  minWidth: 0,
                  minHeight: 0,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            );
          } else {
            return (
              <div className="p-10">
                <video width={width} height={height} src={slide.src} controls />
              </div>
            );
          }
        },
      }}
      index={mediaIndex}
      setIndex={setMediaIndex}
    />
  );
}

export default MediaViewer;
