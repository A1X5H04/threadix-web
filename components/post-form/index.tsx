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

import { Form, FormControl, FormField } from "../ui/form";
import { User } from "@/db/schemas/auth";
import PostLocationDialog from "./location-dialog";
import GifPickerPopover from "./gif-picker";
import RecordDialog from "./record-dialog";
import PollDialog, { pollSchema } from "./poll-dialog";
import PostPoll from "../post-poll";
import MediaDialog from "./media-dialog";
import Poll from "./poll";
import useSWRMutation from "swr/mutation";
// import PostTextArea from "./post-textarea";

const postSchema = z.object({
  content: z.string().min(50),
  location: z.string().optional(),
  media: z.array(z.string()).optional(),
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
  });

  if (!user) return <div>Not Logged In</div>;

  const onFormSubmit = (values: z.infer<typeof postSchema>) => {
    trigger(values, {
      onSuccess: () => {
        toast({
          title: "Post Created",
          description: "Your post has been created successfully!",
        });
        form.reset();
      },
      onError: (err) => {
        console.error(err);
      },
    });
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
    <div className="flex items-start gap-y-2 w-full h-fit p-4 rounded-xl border text-card-foreground shadow">
      <div className="flex flex-col items-center gap-y-1 ">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar ?? ""} />
          <AvatarFallback>{user.name?.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full space-y-2 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex gap-x-2">
              <div className="flex-1 relative">
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="What's on your mind?"
                      className="flex w-full bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      rows={4}
                    />
                  )}
                />
              </div>
              <span className=" text-xs text-muted-foreground">Anyone</span>
            </div>
          </form>
        </Form>

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
