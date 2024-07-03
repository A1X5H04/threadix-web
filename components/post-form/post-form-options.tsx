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
import { pollSchema } from "./dialogs/poll-dialog";
import { cn } from "@/lib/utils";
import { Control, useFormState } from "react-hook-form";
import { postSchema } from ".";

function PostFormOptions({
  poll,
  formControl,
}: {
  poll?: z.infer<typeof pollSchema>;
  formControl?: Control<z.infer<typeof postSchema>>;
}) {
  const { dirtyFields } = useFormState({
    control: formControl,
  });

  console.log("Dirty Fields", dirtyFields, "Poll", poll);

  return (
    <div className="w-full p-3 space-y-4">
      {/* <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem className="basis-1/2" key={idx}>
              <FormMedia />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
      {poll && (
        <div className="cursor-pointer hover:opacity-75 transition-opacity px-2 py-4 border-t">
          <div className="flex gap-x-2 items-center justify-between mb-3">
            <p className="inline-flex items-center gap-x-2">
              <RiBarChartHorizontalLine className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                Created a poll
              </span>
            </p>
            <span className="text-xs text-muted-foreground">
              Ends in {poll.duration}
            </span>
          </div>
          <div className="inline-flex flex-col pl-4">
            <p
              className={
                poll.question
                  ? "font-semibold text-lg"
                  : "italic text-muted font-normal"
              }
            >
              {poll.question || "Post content will be rendered here"}
            </p>
            <div className="inline-flex flex-wrap gap-2 mt-3 mb-6">
              {poll.options.map((option, idx) => (
                <Badge key={idx} variant={"outline"} className="text-sm">
                  {option.isCorrect && "✓"} {option.title}
                </Badge>
              ))}
            </div>
            <p className="inline-flex items-center text-xs font-medium text-muted gap-x-2">
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  poll.multipleAnswers && "text-muted-foreground"
                )}
              >
                <RiListCheck className="w-4 h-4" />
                <span>Multiple</span>
              </span>
              &middot;
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  poll.anonymousVoting && "text-muted-foreground"
                )}
              >
                <RiSpyFill className="w-4 h-4" />
                <span>Anonymous</span>
              </span>
              &middot;
              <span
                className={cn(
                  "inline-flex items-center gap-x-1",
                  poll.quizMode && "text-muted-foreground"
                )}
              >
                <RiQuestionFill className="w-4 h-4" />
                <span>Quiz Mode</span>
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostFormOptions;
