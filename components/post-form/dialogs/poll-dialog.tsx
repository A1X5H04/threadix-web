"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { RiBarChartHorizontalLine, RiCloseLine } from "@remixicon/react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";

interface PollDialogProps {
  poll?: z.infer<typeof pollSchema> | undefined;
  setPoll: (poll: z.infer<typeof pollSchema>) => void;
}

export const pollSchema = z.object({
  question: z.string().optional(),
  options: z
    .array(
      z.object({
        title: z.string().max(8),
        isCorrect: z.boolean().optional(),
      })
    )
    .nonempty()
    .max(8),
  duration: z.string(),
  anonymousVoting: z.boolean(),
  multipleAnswers: z.boolean(),
  quizMode: z.boolean(),
});

function PollDialog({ poll, setPoll }: PollDialogProps) {
  const form = useForm<z.infer<typeof pollSchema>>({
    resolver: zodResolver(pollSchema),
    defaultValues: poll || {
      question: "",
      options: [{ title: "", isCorrect: false }],
      duration: "1h",
      anonymousVoting: false,
      multipleAnswers: false,
      quizMode: true,
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "options",
    rules: {
      validate: (value) => {
        if (value.length < 2) {
          return "Poll must have atleast 2 options";
        }

        const isCorrect = value.filter((item) => item.isCorrect).length;

        if (isCorrect > 1 && form.getValues("quizMode")) {
          return "Poll must have only one correct option";
        }

        if (isCorrect < 1 && form.getValues("quizMode")) {
          return "Poll must have atleast one correct option";
        }
      },
    },
  });

  const onFormSubmit = (values: z.infer<typeof pollSchema>) => {
    console.log(values);
    setPoll(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiBarChartHorizontalLine className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{poll ? "Edit this Poll" : "Create a poll"}</DialogTitle>
          <DialogDescription>
            Ask your friends for their opinion
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="p-2 space-y-6 max-h-72 overflow-y-scroll no-scrollbar">
              <div>
                <h5 className="mb-5 font-semibold">Poll Question</h5>
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's your Favourite movie ?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        This field is optional.
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button className="p-1" variant="link">
                              learn more
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <h5 className="font-semibold mb-2">
                              🎨 Go all creative!
                            </h5>
                            <Separator className="my-2" />
                            <p className="text-sm text-muted-foreground">
                              When the question field is omitted, the question
                              will be your post content, which means you can go
                              all out with your question, add images, gifs, and
                              more!
                            </p>
                          </PopoverContent>
                        </Popover>
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h5 className="mb-5 font-semibold">Options</h5>
                <div className="space-y-2">
                  <RadioGroup value="isCorrect">
                    {fieldArray.fields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-x-4">
                        {form.getValues("quizMode") && (
                          <RadioGroupItem value={`r${index}`} />
                        )}
                        <FormField
                          control={form.control}
                          name={`options.${index}.title`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  placeholder={`Option ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          variant="link"
                          size="icon"
                          type="button"
                          disabled={index == 0}
                          onClick={() => fieldArray.remove(index)}
                        >
                          <RiCloseLine className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                  <p className="text-destructive text-sm">
                    {form.formState.errors.options?.message}
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full"
                    type="button"
                    onClick={() =>
                      fieldArray.append({ title: "", isCorrect: false })
                    }
                    disabled={fieldArray.fields.length == 6}
                  >
                    Add Option
                  </Button>
                  {/* <div className="flex gap-x-2">
                    <Input placeholder="Option One" />
                    <Button variant="link" size="icon">
                      <RiCloseLine className="w-4 h-4" />
                    </Button>
                  </div> */}
                  <p className="text-xs text-muted-foreground">
                    You can add&nbsp;
                    <span className="text-primary">
                      {6 - fieldArray.fields.length}
                    </span>
                    &nbsp;more options
                  </p>
                </div>
              </div>
              <Separator />
              <div>
                <h5 className="mb-5 font-semibold">Settings</h5>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-x-2">
                        <div className="space-y-0.5">
                          <FormLabel>Poll Duration</FormLabel>
                          <FormDescription>
                            Select a duration at which the poll will end.
                          </FormDescription>
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-fit">
                              <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="15m">15 Minutes</SelectItem>
                            <SelectItem value="30m">30 Minutes</SelectItem>
                            <SelectItem value="1h">1 Hour</SelectItem>
                            <SelectItem value="6h">6 Hours</SelectItem>
                            <SelectItem value="12h">12 Hours</SelectItem>
                            <SelectItem value="1d">1 Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="anonymousVoting"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-x-2">
                        <div className="space-y-0.5">
                          <FormLabel>Anonymous Voting</FormLabel>
                          <FormDescription>
                            Allow voters to vote anonymously.
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
                    name="multipleAnswers"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-x-2">
                        <div className="space-y-0.5">
                          <FormLabel>Multiple Votes</FormLabel>
                          <FormDescription>
                            Allow voters to select multiple options.
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
                    name="quizMode"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-x-2">
                        <div className="space-y-0.5">
                          <FormLabel>Quiz Mode</FormLabel>
                          <FormDescription>
                            Show correct answer after polls ends
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
                </div>
              </div>
            </div>
            <DialogFooter className="my-4">
              <Button variant="outline">Discard</Button>
              <DialogClose asChild>
                <Button type="submit">{poll ? "Edit" : "Create"} Poll</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default PollDialog;
