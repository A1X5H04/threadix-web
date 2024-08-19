"use client";

import { postSchema } from "@/types/schemas";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useListTransition } from "transition-hooks";
import { Form } from "../ui/form";
import PostFormItem from "./form-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import GifPicker from "gif-picker-react";
import { PostMediaType } from "@/types";

const threadSchema = z.object({
  posts: z.array(postSchema).min(1),
  reply: z.enum(["anyone", "followers", "mentions"]),
});

function PostFormIndex() {
  const [showGifPicker, setShowGifPicker] = React.useState(-1);

  const form = useForm<z.infer<typeof threadSchema>>({
    defaultValues: {
      posts: [{ content: "", poll: undefined, media: [] }],
      reply: "anyone",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "posts",
    control: form.control,
    rules: {
      required: "This field is required",
    },
  });

  const { transitionList } = useListTransition(fields, {
    timeout: 400,
  });

  // {
  //   transitionList((item, { key, simpleStatus }) => {
  //     return (
  //       <li
  //         style={{
  //           position: simpleStatus === "exit" ? "absolute" : "relative",
  //           opacity: simpleStatus === "enter" ? 1 : 0,
  //           transform:
  //             simpleStatus === "enter" ? "translateX(0)" : "translateX(20px)",
  //           transition: "all 300ms",
  //           viewTransitionName:
  //             simpleStatus === "enter" ? `transition-list-${key}` : "",
  //         }}
  //       >
  //         - {item.content}
  //       </li>
  //     );
  //   });
  // }

  const watchForm = form.watch("posts");
  const inputLength = watchForm[watchForm.length - 1].content?.length ?? 0;

  const onFormSubmit = (data: z.infer<typeof threadSchema>) => {
    // TODO: Filter out the poll where the input is blank
    console.log(data);
  };

  return (
    <div className="border p-6 rounded h-fit w-full">
      {showGifPicker >= 0 ? (
        <div className="space-y-5">
          <GifPicker
            width="100%"
            height="400px"
            onGifClick={(gif) => {
              form.setValue(`posts.${showGifPicker}.media.0`, {
                name: gif.description,
                type: PostMediaType.GIF,
                url: gif.url,
                description: gif.description,
                height: gif.width,
                width: gif.height,
              });
              form.setValue(`posts.${showGifPicker}.isGifSelected`, true);
              setShowGifPicker(-1);
            }}
            tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk"
          />
          <Button
            onClick={() => setShowGifPicker(-1)}
            variant="ghost"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                id="thread-form"
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="w-full"
              >
                <div className="flex flex-col gap-y-2">
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="flex gap-x-3 h-full relative"
                        key={field.id}
                      >
                        <Avatar className="size-9 border">
                          <AvatarImage src="https://i.pinimg.com/236x/f1/97/0a/f1970a8b5bdf920a2e1977a28e2e8c77.jpg" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <Separator
                          className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px] bg-muted"
                          orientation="vertical"
                        />
                        <div className="flex flex-col gap-y-1 w-full h-full">
                          <h3 className="font-semibold ">johndoe</h3>
                          <PostFormItem
                            key={field.id}
                            field={field}
                            index={index}
                            setShowGifPicker={setShowGifPicker}
                          />
                        </div>
                        {index !== 0 && (
                          <div className="p-2">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              <RiCloseLine className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </form>
            </Form>
          </FormProvider>
          <div className="flex gap-3 mt-2">
            <div className="flex justify-center items-center h-full w-9">
              <Avatar
                className={cn(
                  "size-6 ",
                  inputLength < 1 ? "opacity-75" : "opacity-100"
                )}
              >
                <AvatarImage src="https://i.pinimg.com/236x/f1/97/0a/f1970a8b5bdf920a2e1977a28e2e8c77.jpg" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
            <button
              disabled={inputLength < 1}
              onClick={() =>
                append({
                  content: "",
                  poll: undefined,
                  media: [],
                  isAudioSelected: false,
                  isGifSelected: false,
                })
              }
              className={cn(
                "text-sm text-muted-foreground",
                inputLength < 1 && "cursor-not-allowed text-muted"
              )}
            >
              Add to thread
            </button>
          </div>
          <div className="mt-6 w-full flex justify-between items-center ">
            <span className="font-semibold text-sm text-muted-foreground">
              Anyone can reply
            </span>
            <Button form="thread-form">Post</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostFormIndex;

// {shouldMount && (
//   <div
//     style={{
//       transition: "opacity transform 300ms",
//       opacity: simpleStatus == "from" ? 0 : 1,
//       transform:
//         simpleStatus === "from" ? "translateX(200)" : "translateX(0)",
//     }}
//   >
//     <button>
//       <RiCloseLine
//         className="w-6 h-6 text-muted-foreground"
//         onClick={() => setShowGifPicker(-1)}
//       />
//     </button>
//     <GifPicker
//       width="100%"
//       height="500px"
//       onGifClick={(gif) => {
//         console.log("Gif", gif);
//       }}
//       tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk"
//     />
//   </div>
// )}

{
  /* <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full">
            <div className="flex flex-col gap-y-2">
              {fields.map((field, index) => {
                return (
                  <div className="flex gap-x-3 h-full relative" key={field.id}>
                    <Avatar className="size-9">
                      <AvatarImage src="https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Harley" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Separator
                      className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[18px] bg-muted"
                      orientation="vertical"
                    />
                    <div className="flex flex-col gap-y-1 w-full h-full">
                      <h3 className="font-semibold ">johndoe</h3>
                      <PostFormItem
                        key={field.id}
                        field={field}
                        index={index}
                      />
                    </div>
                    {index !== 0 && (
                      <div className="p-2">
                        <button
                          onClick={() => remove(index)}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </form>
        </Form>
      </FormProvider>
      <div className="flex gap-3 mt-2">
        <div className="flex justify-center items-center h-full w-9">
          <Avatar
            className={cn(
              "size-6",
              inputLength < 1 ? "opacity-75" : "opacity-100"
            )}
          >
            <AvatarImage src="https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Harley" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </div>
        <button
          disabled={inputLength < 1}
          onClick={() => append({ content: "" })}
          className={cn(
            "text-sm text-muted-foreground",
            inputLength < 1 && "cursor-not-allowed text-muted"
          )}
        >
          Add to thread
        </button>
      </div> */
}
