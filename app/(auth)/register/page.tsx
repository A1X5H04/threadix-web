"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { redirect } from "next/navigation";
import { useTransition, useEffect, useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiFacebookCircleFill, RiGithubFill } from "@remixicon/react";

import { registerSchema } from "@/types/schemas";
import { register } from "@/actions/register";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { checkUsername } from "@/actions/check-username";
import { useRouter } from "next-nprogress-bar";

function RegisterPage() {
  const router = useRouter();
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isCheckingUsername, checkUsernameTransition] = useTransition();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const debouncedUsername = useDebounce(form.watch("username")?.trim(), 500);

  useEffect(() => {
    if (debouncedUsername !== "" && debouncedUsername.length >= 4) {
      checkUsernameTransition(() => {
        checkUsername(debouncedUsername.trim())
          .then(() => {
            setIsUsernameAvailable(true);
          })
          .catch(() => setIsUsernameAvailable(false));
      });
    }
  }, [debouncedUsername]);

  // useEffect(() => {
  //   const subscription = form.watch((value, { name }) => {
  //     if (name === "username" && value.username?.trim() !== "") {
  //       console.log("Value", value.username);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.watch]);

  const onFormSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(() => {
      register(values)
        .then((msg) => {
          toast.success(msg);
          router.replace("/login");
        })
        .catch((err: any) => toast.error(err.message || "An error occurred"));
    });
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          role="presentation"
                          type="text"
                          autoComplete="new-password"
                          placeholder="john_doe12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className={cn("text-muted-foreground")}>
                        {form.getFieldState("username").isDirty &&
                          form.getValues("username").trim().length >= 4 && (
                            <span
                              className={cn(
                                "text-xs -mt-0.5",
                                isCheckingUsername
                                  ? "text-gray-600"
                                  : isUsernameAvailable
                                  ? "text-emerald-600"
                                  : "text-rose-600"
                              )}
                            >
                              {isCheckingUsername
                                ? "Checking username..."
                                : isUsernameAvailable
                                ? `${debouncedUsername} is available`
                                : `${debouncedUsername} is not available`}
                            </span>
                          )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isPending}
                disabled={isPending}
              >
                Create an account
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Button variant="outline" type="button" className="w-full">
                    <RiFacebookCircleFill />
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" type="button" className="w-full">
                    <RiGithubFill />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
