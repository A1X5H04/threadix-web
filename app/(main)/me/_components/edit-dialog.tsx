"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { profileSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
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
import { RiImageAddFill } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucia";
import useSWRMutation from "swr/mutation";
import { PATCH } from "@/lib/fetcher";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

export function EditDialog({ user }: { user: User }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { edgestore } = useEdgeStore();
  const [avatarImage, setAvatarImage] = React.useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      isPublic: user.isPublic || false,
      link: user.link || "",
      avatar: user.avatar || "",
    },
    resolver: zodResolver(profileSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    `/api/profile/${user.username}`,
    PATCH<z.infer<typeof profileSchema>>,
  );

  const onFormSubmit = async (data: z.infer<typeof profileSchema>) => {
    if (avatarImage) {
      const res = await edgestore.publicFiles.upload({ file: avatarImage });
      form.setValue("avatar", res.url);
    }

    trigger({ ...data, avatar: form.getValues("avatar") })
      .then(() => {
        toast.success("Profile updated successfully");
        router.refresh();
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarImage(file);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full font-semibold">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
              <div className="space-y-3 max-h-64 px-0.5 overflow-y-scroll no-scrollbar py-2 mb-5">
                <div className="grid place-items-center">
                  <input
                    type="file"
                    hidden
                    ref={inputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Avatar
                    className="w-20 h-20 cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                  >
                    <AvatarFallback>
                      <RiImageAddFill className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                    <AvatarImage
                      src={
                        avatarImage
                          ? URL.createObjectURL(avatarImage)
                          : user.avatar
                      }
                    />
                  </Avatar>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your username"
                            className="flex-1 w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com" />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        <span className="text-sm text-muted-foreground">
                          Add your website or social link
                        </span>
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between shadow-sm border rounded p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Public Profile </FormLabel>
                        <FormDescription>
                          {field.value
                            ? "Everyone on threadix can see your posts"
                            : "Only your followers can see your posts"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          {...field}
                          placeholder="18 y.o developer, designer and writer from earth, currently living in Mars etc.."
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-sm text-muted-foreground">
                        Add a short bio of yourself
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  isLoading={isMutating || form.formState.isSubmitting}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
