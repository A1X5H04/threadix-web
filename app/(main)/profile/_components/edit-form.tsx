"use client";

import * as z from "zod";
import { profileSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function EditForm() {
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      link: "",
      avatar: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const onFormSubmit = (data: z.infer<typeof profileSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3 max-h-64 px-0.5 overflow-y-scroll no-scrollbar"
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your username" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your website or social link"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} placeholder="Enter your bio" />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default EditForm;
