"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const watchUsername = form.watch("username");
    if (watchUsername) {
      console.log("Checking username availability", watchUsername);
    }
  }, [form]);

  const onFormSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(() =>
      register(values)
        .then((res) => {
          toast({
            title: res.title,
            description: res.message,
            variant: res.status ? "default" : "destructive",
            action: res.status ? (
              <ToastAction
                altText="Login Now"
                onClick={() => router.push("/login")}
              >
                Login Now
              </ToastAction>
            ) : undefined,
          });
        })
        .catch((err: any) => {
          console.log("Register Error", err);
        })
    );
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
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
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
                        <Input placeholder="john_doe12" {...field} />
                      </FormControl>
                      <FormDescription className={cn("text-muted-foreground")}>
                        {form.getFieldState("username").isTouched
                          ? "Checking username availability..."
                          : ""}
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
