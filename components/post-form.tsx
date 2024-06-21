"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  RiBarChartHorizontalLine,
  RiFileGifLine,
  RiMapPin2Line,
  RiMic2Line,
  RiUploadLine,
} from "@remixicon/react";

import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

import { Form, FormControl, FormField } from "./ui/form";
import { User } from "@/db/schemas/auth";
import PostLocationDialog from "./location-dialog";
import GifPickerPopover from "./gif-picker";
import RecordDialog from "./record-dialog";
// import PostTextArea from "./post-textarea";

const postSchema = z.object({
  content: z.string().min(50),
  media: z.array(z.string()),
});

function PostForm({ user }: { user: User | null }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof postSchema>>({
    defaultValues: {
      content: "",
      media: [],
    },
  });

  if (!user) return <div>Not Logged In</div>;

  const onFormSubmit = (values: z.infer<typeof postSchema>) => {
    axios
      .post("/api/post", values)
      .then((res: any) => {
        console.log("Response Data", res.data);
        toast({
          title: "Post Created",
          description: "Your post has been created successfully!",
        });
        form.reset();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex items-start gap-x-2 w-full h-fit p-4 rounded-xl border text-card-foreground shadow">
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
              <div className="flex-1">
                <FormControl>
                  <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="What's on your mind?"
                        className="resize-none"
                        rows={3}
                      />
                    )}
                  />
                </FormControl>
              </div>
              <Button className="font-semibold">Post</Button>
            </div>
          </form>
        </Form>
        <div className="inline-flex items-center justify-between w-full">
          <div>
            {/* <Button variant="ghost" size="icon">
              <RiEmotionLine className="w-4 h-4 text-muted-foreground" />
            </Button> */}
            <Button variant="ghost" size="icon">
              <RiUploadLine className="w-4 h-4 text-muted-foreground" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">Anyone</span>
        </div>
      </div>
    </div>
  );
}

export default PostForm;

// AIzaSyDFPshK0fSveptnAxuqSHrKROQBPSO5nFk
