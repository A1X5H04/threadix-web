"use client";

import { ReactNode, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseLine } from "@remixicon/react";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { User } from "lucia";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { postSchema } from "@/types/schemas";
import { POST } from "@/lib/fetcher";

import GifPickerDialog from "../../dialogs/gif-picker";
import VoiceRecordDialog from "../../dialogs/voice-record";
import AddThread from "./add-thread";
import PostFormItem from "./form-item";
import PostPermission from "./post-permission";
import PostFormSkeleton from "@/components/skeletons/post-form";
import useSWR from "swr";
import { getUsers } from "@/actions/users";
import { getTags } from "@/actions/tags";

const threadSchema = z.object({
  posts: z.array(postSchema).min(1),
  reply: z.string().optional(),
});

export type ThreadSchema = z.infer<typeof threadSchema>;

function PostFormIndex({
  user,
  postId,
  withQuote,
  // setIsFormDirty,
  closeModal,
}: {
  user: User;
  postId?: string;
  withQuote?: ReactNode;
  // setIsFormDirty: (value: boolean) => void;
  closeModal: () => void;
}) {
  const { data: usernames, isLoading: isUsernameLoading } = useSWR(
    "usernames",
    getUsers,
    { onError: () => toast.error("Failed to fetch mentions") }
  );
  const { data: tags, isLoading: isTagsLoading } = useSWR("tags", getTags, {
    onError: () => toast.error("Failed to fetch tags"),
  });

  const { trigger, isMutating, error } = useSWRMutation(
    "/api/post",
    POST<ThreadSchema & { postId?: string; postType?: "quote" | "reply" }>
  );

  const [audioPostIndex, setAudioPostIndex] = useState(-1);
  const [gifPostIndex, setGifPostIndex] = useState(-1);

  const form = useForm<ThreadSchema>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      posts: [{ content: "", poll: undefined, media: [] }],
      reply: "",
    },
  });

  // useEffect(() => {
  //   setIsFormDirty(form.formState.isDirty);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.formState.isDirty]);

  const { fields, append, remove } = useFieldArray({
    name: "posts",
    control: form.control,
    rules: {
      required: "This field is required",
    },
  });

  const onFormSubmit = (data: z.infer<typeof threadSchema>) => {
    // Filtering out empty values from the poll field
    data.posts.map((item, idx) => {
      if (item.poll) {
        const optionsWithoutEmptyTitle = item.poll.options.filter(
          (item) => item.title.trim() !== ""
        );
        form.setValue(`posts.${idx}.poll.options`, optionsWithoutEmptyTitle);
      }
    });
    const pendingToast = toast.loading("Posting thread...");
    closeModal();
    trigger(
      postId
        ? {
            postId,
            postType: withQuote ? "quote" : "reply",
            ...form.getValues(),
          }
        : form.getValues()
    )
      .then((res: { id: string }) =>
        toast.success(
          <div className="flex items-center gap-x-2 justify-between">
            <p>
              {postId ? "Replied to the post" : "Thread posted successfully"}
            </p>
            {!postId && (
              <Link
                className="hover:underline font-bold"
                href={`/users/${user.id}/posts/${res.id}`}
              >
                View thread
              </Link>
            )}
          </div>,
          { id: pendingToast }
        )
      )
      .catch(() => toast.error("Failed to post thread", { id: pendingToast }));
  };

  if (isUsernameLoading || isTagsLoading) return <PostFormSkeleton />;

  return (
    <div className="h-fit w-full z-40">
      <div className="overflow-hidden box-border">
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full">
              <div className="flex flex-col gap-y-2">
                {fields.map((field, index) => {
                  return (
                    <div
                      className="flex gap-x-3 h-full relative"
                      key={field.id}
                    >
                      <Avatar className="size-9 border">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.at(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Separator
                        className="absolute w-0.5 translate-y-[2.88rem] h-[calc(100%-2.88rem)] left-[17px] bg-muted"
                        orientation="vertical"
                      />
                      <div className="flex flex-col gap-y-1 w-full h-full">
                        <h3 className="font-semibold ">{user.username}</h3>
                        <PostFormItem
                          key={field.id}
                          field={field}
                          index={index}
                          lists={{
                            usernames: usernames ?? [],
                            tags: tags ?? [],
                          }}
                          quotePost={withQuote}
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
              <div className="absolute bottom-0 w-full flex justify-between items-center max-w-2xl">
                <PostPermission />

                <Button
                  disabled={isMutating || !form.formState.isDirty}
                  type="submit"
                >
                  {isMutating ? "Posting..." : "Post thread"}
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
      <GifPickerDialog
        isOpen={gifPostIndex >= 0}
        setIsOpen={() => setGifPostIndex(-1)}
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
      />
      <VoiceRecordDialog
        isOpen={audioPostIndex >= 0}
        setIsOpen={() => setAudioPostIndex(-1)}
        handleAudio={(audio) => {
          form.setValue(`posts.${audioPostIndex}.audio`, {
            url: audio.url,
            name: audio.name,
            type: audio.type,
          });
          setAudioPostIndex(-1);
        }}
      />
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
