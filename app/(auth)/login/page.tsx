"use client";

import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {RiFacebookCircleFill, RiGithubFill, RiGoogleFill} from "@remixicon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/types/schemas";
import { login } from "@/actions/login";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onFormSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      login(data)
        .then(() => {
          toast.success("Logged in successfully!");
          router.push("/");
        })
        .catch((err) => toast.error(err.message || "An error occurred"));
    });
  };

  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-xl font-black">Welcome back!</CardTitle>
        <CardDescription>
          Login to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} >
            <div className="grid gap-4 w-full">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username / Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john_doe12"
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
                          placeholder="******"
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
                Login
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Button variant="outline" type="button" className="w-full">
                    <RiGoogleFill />
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
          Don&apos;t have an account?&nbsp;
          <Link href="register" className="hover:underline font-bold">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
