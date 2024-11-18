import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Media } from "@/types/api-response";
import PostMediaGif from "./gif";
import PostMediaAudio from "./audio";

import MediaViewer from "./viewer";
import { RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";

function PostMedia({ media }: { media: Media[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const [mediaIndex, setMediaIndex] = useState<number>();
  const [emblaRef] = useEmblaCarousel({
    loop: false,
  });

  const isMediaFiles = media.some(
    (m) => m.type === "video" || m.type === "image"
  );
  const isAudioFile = media.some(
    (m) => m.type === "audio" || m.type === "voice"
  );
  const isGif = media.some((m) => m.type === "gif");

  return (
    <div
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
    >
      {isGif && (
        <PostMediaGif media={media.at(0)!} onClick={() => setMediaIndex(0)} />
      )}
      {isAudioFile && <PostMediaAudio media={media.at(0)!} />}
      {isMediaFiles && (
        <div
          className="overflow-hidden mb-4 w-full"
          ref={media.length > 1 ? emblaRef : undefined}
        >
          <div className="flex flex-nowrap gap-x-2 w-full max-h-80">
            {media.map((mediaItem, index) => (
              <div
                onClick={(evt) => {
                  evt.preventDefault();

                  /* The video should be paused when the lightbox is open but there is now way to resume 
                    it when lightbox is closed (there is no callback for that), so I have to mute it, as it will
                    interfere with the lightbox playback also there is a performance drawback... */
                  if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.currentTime = 0;
                  }
                  setMediaIndex(index);
                }}
                key={mediaItem.url}
                className={cn(
                  "relative w-full flex-shrink-0 max-h-72",
                  Math.round(mediaItem.width / mediaItem.height) >= 2 &&
                    media.length == 1
                    ? "basis-full"
                    : mediaItem.width / mediaItem.height >= 2 &&
                      media.length > 1
                    ? "basis-96"
                    : mediaItem.width / mediaItem.height >= 1
                    ? "basis-60"
                    : "basis-36"
                )}
              >
                {mediaItem.type === "video" ? (
                  <div className="relative max-h-72">
                    <video
                      ref={videoRef}
                      src={mediaItem.url}
                      className="w-full h-full object-cover rounded-md"
                      muted
                      autoPlay
                      loop
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (videoRef.current) {
                          videoRef.current.muted = !videoRef.current.muted;
                          setIsMuted((prevMuted) => !prevMuted);
                        }
                      }}
                      className="absolute bottom-2.5 right-2.5 p-1 bg-black bg-opacity-50 backdrop-blur-md text-white text-xs rounded-md font-semibold"
                    >
                      {isMuted ? (
                        <RiVolumeMuteLine className="w-4 h-4 text-white" />
                      ) : (
                        <RiVolumeUpLine className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                ) : (
                  <Image
                    width={mediaItem.width}
                    height={mediaItem.height}
                    src={mediaItem.url}
                    alt={mediaItem.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <MediaViewer
        media={media}
        mediaIndex={mediaIndex}
        setMediaIndex={setMediaIndex}
      />
    </div>
  );
}

export default PostMedia;
