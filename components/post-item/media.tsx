import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React from "react";
import LightBox from "yet-another-react-lightbox-lite";
import "yet-another-react-lightbox-lite/styles.css";

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
  const [mediaIndex, setMediaIndex] = React.useState<number>();
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  return (
    <div>
      <div className="overflow-hidden mb-4 w-full" ref={emblaRef}>
        <div className="flex flex-nowrap gap-x-2 w-full max-h-80">
          {media.map((mediaItem, index) => (
            <div
              onClick={() => {
                setMediaIndex(index);
              }}
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
      <LightBox
        slides={media.map((mediaItem) => ({
          src: mediaItem.url,
        }))}
        toolbar={{
          fixed: true,
        }}
        render={{
          slide: ({ slide, rect }) => {
            const width =
              slide.width && slide.height
                ? Math.round(
                    Math.min(
                      rect.width,
                      (rect.height / slide.height) * slide.width
                    )
                  )
                : rect.width;

            const height =
              slide.width && slide.height
                ? Math.round(
                    Math.min(
                      rect.height,
                      (rect.width / slide.width) * slide.height
                    )
                  )
                : rect.height;

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
          },
        }}
        index={mediaIndex}
        setIndex={setMediaIndex}
      />
    </div>
  );
}

export default PostMedia;
