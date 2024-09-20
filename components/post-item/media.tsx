import { useIsClient } from "@/hooks/use-isclient";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import LightBox from "yet-another-react-lightbox-lite";
import "yet-another-react-lightbox-lite/styles.css";
import { Button } from "../ui/button";
import {
  RiMusic2Line,
  RiPauseFill,
  RiPlayFill,
  RiVoiceRecognitionLine,
} from "@remixicon/react";

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

  const isClient = useIsClient();
  const visualizerControls = useVoiceVisualizer();

  useEffect(() => {
    if (isAudioFile) {
      fetch(media[0].url)
        .then((response) => response.blob())
        .then((blob) => {
          visualizerControls.setPreloadedAudioBlob(blob);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media[0].url]);

  const isMediaFiles = media.some(
    (m) => m.type === "video" || m.type === "image"
  );
  const isAudioFile = media.some(
    (m) => m.type === "audio" || m.type === "voice"
  );
  const isGif = media.some((m) => m.type === "gif");

  console.log(media, isMediaFiles, isAudioFile, isGif);

  if (isMediaFiles) {
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

  if (isAudioFile && isClient) {
    return (
      <div className="mb-2">
        <div className="bg-black w-full border rounded-lg overflow-hidden p-2 relative">
          <div className="flex items-center p-4 w-full gap-x-4">
            <Button
              type="button"
              onClick={visualizerControls.togglePauseResume}
              disabled={!isClient}
              className="w-14 h-14"
            >
              {visualizerControls.isPausedRecordedAudio ? (
                <RiPlayFill className="w-5 h-5" />
              ) : (
                <RiPauseFill className="w-5 h-5" />
              )}
            </Button>
            <div className="flex-1">
              <VoiceVisualizer
                width="100%"
                height={90}
                controls={visualizerControls}
                isControlPanelShown={false}
                isDefaultUIShown={false}
                audioProcessingTextClassName="text-muted-foreground text-xs font-semibold font-mono"
                barWidth={3}
                gap={1}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-x-1">
            {media[0].type === "audio" ? (
              <span title="Audio File">
                <RiMusic2Line className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span title="Voice Recording">
                <RiVoiceRecognitionLine className="w-3.5 h-3.5" />
              </span>
            )}
            <p
              className="text-xs font-medium max-w-36 truncate"
              title={media[0].name}
            >
              {media[0].name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {visualizerControls.formattedDuration}
          </p>
        </div>
      </div>
    );
  }
}

export default PostMedia;
