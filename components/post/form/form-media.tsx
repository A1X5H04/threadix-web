import { PostMediaSchema } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function FormMedia({
  media,
  setMedia,
}: {
  media: PostMediaSchema[];
  setMedia: (media: PostMediaSchema[]) => void;
}) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  console.log("Current media", media);

  return (
    <div className="overflow-hidden mb-4 w-full" ref={emblaRef}>
      <div className="flex flex-nowrap gap-x-2 w-full max-h-80">
        {media.map((mediaItem, index) => (
          <div
            key={mediaItem.url}
            className={cn(
              "relative w-full flex-shrink-0 max-h-96",
              Math.round(mediaItem.width / mediaItem.height) >= 2
                ? "basis-full"
                : mediaItem.width / mediaItem.height >= 1
                ? "basis-60"
                : "basis-40"
            )}
          >
            <span>
              <button
                onClick={() => {
                  const newMedia = media.filter(
                    (item) => item.url !== mediaItem.url
                  );
                  setMedia(newMedia);
                }}
                className="absolute top-2 right-2 p-1 bg-muted hover:bg-muted text-muted-foreground transition-colors rounded-lg z-30"
              >
                <RiCloseLine className="w-4 h-4 text-muted-foreground" />
              </button>
            </span>
            {mediaItem.type === "video" ? (
              <video
                src={mediaItem.url}
                className="w-full h-full object-cover rounded-md"
                muted
                autoPlay
                loop
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

export default FormMedia;
