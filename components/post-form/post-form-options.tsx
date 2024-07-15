import React from "react";
import {
  RiBarChartHorizontalLine,
  RiImageFill,
  RiFilmFill,
  RiListCheck,
  RiSpyFill,
  RiQuestionFill,
} from "@remixicon/react";
import * as z from "zod";
import { Badge } from "../ui/badge";

import FormMedia from "./form-media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { Control, useFormState, useWatch } from "react-hook-form";
import { postSchema } from ".";

function PostFormOptions({
  formControl,
}: {
  formControl?: Control<z.infer<typeof postSchema>>;
}) {
  const watchPoll = useWatch({
    control: formControl,
    name: "poll",
  });

  const watchMedia = useWatch({
    control: formControl,
    name: "media",
  });

  const watchGif = useWatch({
    control: formControl,
    name: "gif",
  });

  const watchAudio = useWatch({
    control: formControl,
    name: "audio",
  });

  console.log("pollField", watchPoll);

  return (
    <React.Fragment>
      {watchGif && (
        <div className="flex gap-x-2 items-center justify-between mb-3">
          <p className="inline-flex items-center gap-x-2">
            <RiImageFill className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">Gif</span>
          </p>
          <span className="text-xs text-muted-foreground">
            {watchGif.description}
          </span>
        </div>
      )}
      {watchMedia && (
        <div>
          {watchMedia.map((media, idx) => (
            <div key={idx}>{JSON.stringify(media)}</div>
          ))}
        </div>
      )}
      {watchAudio && (
        <div className="space-y-4 border-t py-4 px-2">
          <div className="flex gap-x-2 items-center justify-between mb-3">
            <p className="inline-flex items-center gap-x-2 text-muted-foreground text-xs">
              <RiFilmFill className="w-3 h-3 text-muted-foreground" />
              <span>Audio</span>
              &middot;
              <span>{watchAudio.name}</span>
            </p>
            <span className="text-xs text-muted-foreground">
              {watchAudio.duration}
            </span>
          </div>
          <div>
            <audio
              className="w-full appearance-none"
              src={watchAudio.url}
              controls
            ></audio>
          </div>
        </div>
      )}
      {/* <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem className="basis-1/4" key={idx}>
              <FormMedia />
            </CarouselItem>
          ))}
        </CarouselContent>
      )}
      {/* <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem className="basis-1/4" key={idx}>
              <FormMedia />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}

      {/* <div className="overflow-x-auto whitespace-nowrap no-scrollbar">
        <ul className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx}>
              <li className="flex-none">
                <FormMedia />
              </li>
            </div>
          ))}
        </ul>
      </div> */}
      {watchPoll && (
        <div className="px-2 py-4 border-t">
          <div className="flex gap-x-2 items-center justify-between mb-3">
            <p className="inline-flex items-center gap-x-2">
              <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                Created a poll
              </span>
            </p>
            <span className="text-xs text-muted-foreground">
              Ends in {watchPoll.duration}
            </span>
          </div>
          <div className="inline-flex flex-col pl-4">
            <p
              className={
                watchPoll.question
                  ? "font-semibold text-lg"
                  : "italic text-muted font-normal"
              }
            >
              {watchPoll.question || "Post content will be rendered here"}
            </p>
            <div className="inline-flex flex-wrap gap-2 mt-3 mb-6">
              {watchPoll.options.map((option, idx) => (
                <Badge
                  key={idx}
                  variant={option.isCorrect ? "secondary" : "outline"}
                  className="text-sm"
                >
                  {option.isCorrect && "✓"} {option.title}
                </Badge>
              ))}
            </div>
            <p className="inline-flex items-center text-xs font-medium text-muted gap-x-2">
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  watchPoll.multipleAnswers && "text-muted-foreground"
                )}
              >
                <RiListCheck className="w-4 h-4" />
                <span>Multiple</span>
              </span>
              &middot;
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  watchPoll.anonymousVoting && "text-muted-foreground"
                )}
              >
                <RiSpyFill className="w-4 h-4" />
                <span>Anonymous</span>
              </span>
              &middot;
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  watchPoll.quizMode && "text-muted-foreground"
                )}
              >
                <RiQuestionFill className="w-4 h-4" />
                <span>Quiz Mode</span>
              </span>
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default PostFormOptions;
