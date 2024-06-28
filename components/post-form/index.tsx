"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  RiBarChartHorizontalLine,
  RiFileGifLine,
  RiMapPin2Line,
  RiMic2Line,
  RiUploadLine,
} from "@remixicon/react";

import { useToast } from "../ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { User } from "@/db/schemas/auth";
import PostLocationDialog from "./location-dialog";
import GifPickerPopover from "./gif-picker";
import RecordDialog from "./record-dialog";
import PollDialog, { pollSchema } from "./poll-dialog";
import PostPoll from "../post-poll";
import MediaDialog from "./media-dialog";
import Poll from "./poll";
import useSWRMutation from "swr/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { postMediaSchema } from "@/types/schemas";
import FormOptions from "./form-options";
import { Separator } from "../ui/separator";
// import PostTextArea from "./post-textarea";

const postSchema = z.object({
  content: z.string().min(50, "Post content should be at least 50 characters"),
  location: z.string().optional(),
  media: z.array(postMediaSchema).optional(),
  poll: pollSchema.optional(),
});

async function sayHello(
  url: string,
  { arg }: { arg: z.infer<typeof postSchema> }
) {
  console.log("Post Values", arg);
}

function PostForm({ user }: { user: User | null }) {
  const { trigger } = useSWRMutation("/api/post", sayHello);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      content: "",
      location: "",
      media: [],
      poll: undefined,
    },
    resolver: zodResolver(postSchema),
  });

  if (!user) return <div>Not Logged In</div>;

  const onFormSubmit = (values: z.infer<typeof postSchema>) => {
    // trigger(values, {
    //   onSuccess: () => {
    //     toast({
    //       title: "Post Created",
    //       description: "Your post has been created successfully!",
    //     });
    //     form.reset();
    //   },
    //   onError: (err) => {
    //     console.error(err);
    //   },
    // });
    // axios
    //   .post("/api/post", values)
    //   .then((res: any) => {
    //     console.log("Response Data", res.data);
    //     toast({
    //       title: "Post Created",
    //       description: "Your post has been created successfully!",
    //     });
    //     form.reset();
    //   })
    //   .catch((err) => console.error(err));
    console.log("Post Values", values);
  };

  return (
    <div className="w-full h-fit p-4 rounded-xl border text-card-foreground shadow">
      <div className="flex justify-between items-center gap-x-2">
        <div className="inline-flex items-center gap-x-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user.avatar ?? ""} />
            <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="inline-flex flex-col ">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-muted-foreground italic">
              anyone can see this post
            </span>
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          type="submit"
          className="font-semibold"
        >
          Anyone
        </Button>
      </div>
      <div className="w-full space-y-2 pl-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex gap-x-2 relative">
              <div className="flex-1">
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="What's on your mind?"
                          className="flex w-full bg-transparent px-2 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <FormOptions />
        <div className="inline-flex items-center justify-between w-full">
          <div>
            {/* <Button variant="ghost" size="icon">
              <RiEmotionLine className="w-4 h-4 text-muted-foreground" />
            </Button> */}
            <MediaDialog>
              <Button variant="ghost" size="icon">
                <RiUploadLine className="w-4 h-4 text-muted-foreground" />
              </Button>
            </MediaDialog>
            <GifPickerPopover>
              <Button variant="ghost" size="icon">
                <RiFileGifLine className="w-4 h-4 text-muted-foreground" />
              </Button>
            </GifPickerPopover>
            <PostLocationDialog>
              <Button variant="ghost" size="icon">
                <RiMapPin2Line className="w-4 h-4 text-muted-foreground" />
              </Button>
            </PostLocationDialog>
            <RecordDialog>
              <Button variant="ghost" size="icon">
                <RiMic2Line className="w-4 h-4 text-muted-foreground" />
              </Button>
            </RecordDialog>
            <PollDialog
              poll={form.getValues("poll")}
              setPoll={(value) => form.setValue("poll", value)}
            >
              <Button variant="ghost" size="icon">
                <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
              </Button>
            </PollDialog>
          </div>
          <Button type="submit" className="font-semibold">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;

// AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk
