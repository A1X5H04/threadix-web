"use client";

import { postSchema } from "@/types/schemas";
import React, { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Transition, useListTransition, useTransition } from "transition-hooks";
import { Form } from "../ui/form";
import PostFormItem from "./form-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { RiCloseFill, RiCloseLine, RiExpandUpDownLine } from "@remixicon/react";
import { Button } from "../ui/button";
import GifPicker from "gif-picker-react";
import AddThread from "./add-thread";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RecordForm from "./record-form";
import PostPermission from "./post-permission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";

const threadSchema = z.object({
  posts: z.array(postSchema).min(1),
  reply: z.string().optional(),
});

export type ThreadSchema = z.infer<typeof threadSchema>;

function PostFormIndex() {
  const { edgestore } = useEdgeStore();
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [gifPostIndex, setGifPostIndex] = React.useState(-1);
  const [audioPostIndex, setAudioPostIndex] = React.useState(-1);

  const form = useForm<ThreadSchema>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      posts: [{ content: "", poll: undefined, media: [] }],
      reply: "",
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

  // To make form submit only if the type is "submit" on button
  // Because the default behavior of the button does fucking form submit on every button press
  // useEffect(() => {
  //   const formElement = formRef.current;

  //   if (formElement) {
  //     const handleClick = (event: MouseEvent) => {
  //       const target = event.target as HTMLButtonElement;
  //       if (target.tagName === "BUTTON" && target.type !== "submit")
  //         event.preventDefault();
  //     };

  //     formElement.addEventListener("click", handleClick);

  //     return () => formElement.removeEventListener("click", handleClick);
  //   }
  // }, []);

  const onFormSubmit = (data: z.infer<typeof threadSchema>) => {
    /**
     * TODO: Before submitting for this this should be done
     * - Filter out the poll where the value is <empty string>
     * - Confirm Upload the media and audio files if any
     * - Parse the content and add mentions and tags if there are any
     * -
     */

    form.reset();
  };

  return (
    <div className="border p-6 rounded h-fit w-full overflow-hidden">
      <Transition state={Boolean(gifPostIndex >= 0)}>
        {({ shouldMount, simpleStatus }) =>
          shouldMount && (
            <div
              className="space-y-2"
              style={{
                transition: "all 0.5s ease-in-out",
                transform:
                  simpleStatus === "enter"
                    ? "translateY(0px)"
                    : simpleStatus === "exit"
                    ? "translateY(-50px)"
                    : "translateY(50px)",
                opacity:
                  simpleStatus === "enter"
                    ? 1
                    : simpleStatus === "exit"
                    ? 0
                    : 0,
              }}
            >
              <div className="flex items-center justify-between px-2">
                <h1 className="font-semibold text-lg tracking-tight">
                  Pick up your favourite meme
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGifPostIndex(-1)}
                >
                  <RiCloseFill className="w-5 h-5" />
                </Button>
              </div>
              <GifPicker
                width="100%"
                height="calc(100vh - 350px)"
                onGifClick={(gif) => {
                  form.setValue(`posts.${gifPostIndex}.gif`, {
                    url: gif.url,
                    description: gif.description,
                    name: gif.tags[0],
                    height: gif.height,
                    width: gif.width,
                  });
                  setGifPostIndex(-1);
                }}
                tenorApiKey="AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk"
              />
            </div>
          )
        }
      </Transition>

      {audioPostIndex >= 0 && (
        <RecordForm
          setAudio={(audio) => {
            form.setValue(`posts.${audioPostIndex}.audio`, audio);
            setAudioPostIndex(-1);
          }}
          onCancel={() => setAudioPostIndex(-1)}
        />
      )}
      {gifPostIndex === -1 && audioPostIndex === -1 && (
        <FormProvider {...form}>
          <Form {...form}>
            <form
              ref={formRef}
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
                          setGifPostIndex={setGifPostIndex}
                          setAudioPostIndex={setAudioPostIndex}
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
              <AddThread append={append} />
              <div className="mt-6 w-full flex justify-between items-center ">
                <PostPermission />
                <Button type="submit">Post</Button>
              </div>
            </form>
          </Form>
        </FormProvider>
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
