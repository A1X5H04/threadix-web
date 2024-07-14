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
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
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

  console.log("pollField", watchPoll);

  return (
    <React.Fragment>
      {watchMedia && (
        <div>
          {watchMedia.map((media, idx) => (
            <div>{JSON.stringify(media)}</div>
          ))}
        </div>
      )}
      {/* <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem className="basis-1/2" key={idx}>
              <FormMedia />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
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
                <Badge key={idx} variant={"outline"} className="text-sm">
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
