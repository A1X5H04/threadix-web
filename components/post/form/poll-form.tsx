import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { PollSchema, PostSchema } from "@/types";
import { cn } from "@/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RiArrowDownSLine,
  RiBarChartHorizontalFill,
  RiBrainFill,
} from "@remixicon/react";

const timeInterval = [
  {
    label: "15 minutes",
    value: "15m",
  },
  {
    label: "30 minutes",
    value: "30m",
  },
  {
    label: "1 hour",
    value: "1h",
  },
  {
    label: "6 hours",
    value: "6h",
  },
  {
    label: "12 hours",
    value: "12h",
  },
  {
    label: "1 day",
    value: "1d",
  },
];

function PollForm({
  itemIndex,
  watchedPoll,
}: {
  itemIndex: number;
  watchedPoll: PollSchema;
}) {
  const { getValues, setValue, control, formState } = useFormContext<{
    posts: PostSchema[];
  }>();

  const { fields, append, remove } = useFieldArray<{ posts: PostSchema[] }>({
    name: `posts.${itemIndex}.poll.options`,
    rules: {
      minLength: {
        value: 2,
        message: "You need at least two options",
      },
    },
  });

  const handleRadioChange = useCallback(
    (value: string) => {
      fields.forEach((_, index) => {
        console.log("index", index, index === parseInt(value));
        setValue(
          `posts.${itemIndex}.poll.options.${index}.isCorrect`,
          index === parseInt(value)
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, itemIndex]
  );

  useEffect(() => {
    const lastOption =
      watchedPoll.options?.[watchedPoll.options?.length - 1]?.title;
    const secondLastOption =
      watchedPoll.options?.[watchedPoll.options?.length - 2]?.title;

    if (lastOption && watchedPoll.options.length < 4) {
      append({ title: "" }, { shouldFocus: false });
    }

    // Remove the last field if the second last field is empty
    if (!secondLastOption && watchedPoll.options.length > 1) {
      remove(fields.length - 1);
    }

    if (!lastOption && watchedPoll.options.length === 1) {
      setValue(`posts.${itemIndex}.poll`, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPoll.options, append, remove]);

  return (
    <div className="overflow-hidden p-1">
      <div className="space-y-2 mb-4">
        <RadioGroup
          onValueChange={(value) => handleRadioChange(value)}
          defaultValue="0"
        >
          {fields.map((field, idx) => (
            <div key={field.id} className="relative space-y-2">
              <FormField
                name={`posts.${itemIndex}.poll.options.${idx}.title`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          idx === fields.length - 1
                            ? "Add another option"
                            : "Option"
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        className={cn(
                          idx === fields.length - 1 &&
                            field.value == "" &&
                            "border-dashed focus:border-solid"
                        )}
                      />
                    </FormControl>
                    <FormMessage />

                    {getValues(`posts.${itemIndex}.poll`)?.quizMode == true && (
                      <>
                        {field.value && (
                          <RadioGroupItem
                            className="absolute bottom-1/2 translate-y-1/2 right-4 bg-white dark:bg-black"
                            value={`${idx}`}
                            id="radio"
                          />
                        )}
                      </>
                    )}
                  </FormItem>
                )}
              />
            </div>
          ))}
        </RadioGroup>
        {formState.errors?.posts?.[itemIndex]?.poll?.options?.root && (
          <span className="text-xs text-destructive">
            {formState.errors.posts[itemIndex].poll.options.root.message}
          </span>
        )}
        <div className="w-full flex justify-between">
          <div className="inline-flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => {
                setValue(
                  `posts.${itemIndex}.poll.quizMode`,
                  !getValues(`posts.${itemIndex}.poll.quizMode`)
                );
              }}
              className=" inline-flex items-center gap-x-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground rounded-sm py-1 px-1.5 disabled:opacity-25 disabled:cursor-default"
            >
              {getValues(`posts.${itemIndex}.poll.quizMode`) ? (
                <RiBrainFill className="w-3 h-3" />
              ) : (
                <RiBarChartHorizontalFill className="w-3 h-3" />
              )}
              {getValues(`posts.${itemIndex}.poll.quizMode`) ? "Quiz" : "Poll"}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1 text-xs text-muted-foreground hover:bg-muted py-1 px-1.5 rounded-sm"
                >
                  Ends in {getValues(`posts.${itemIndex}.poll.duration`)}
                  <RiArrowDownSLine className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-10">
                <DropdownMenuLabel className="text-xs py-1">
                  Poll Duration
                </DropdownMenuLabel>

                {timeInterval.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() =>
                      setValue(`posts.${itemIndex}.poll.duration`, item.value)
                    }
                    className="text-xs py-1 cursor-pointer"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            type="button"
            onClick={() => setValue(`posts.${itemIndex}.poll`, undefined)}
            className="text-xs text-muted-foreground font-semibold cursor-pointer hover:text-foreground"
          >
            Remove Poll
          </button>
        </div>
      </div>
    </div>
  );
}

export default PollForm;

// useEffect(() => {
//   // Watch the values of the fields

//   const subscription = watch((value) => {
//     const options = value?.posts?.[itemIndex]?.poll?.options;
//     const lastOption = options?.[options?.length - 1]?.title;
//     const secondLastOption = options?.[options?.length - 2]?.title;

//     // Append a new field if the last option is not empty and the number of fields is less than 4
//     if (lastOption && options.length < 4) {
//       append({
//         title: "",
//       });
//     }

//     // Remove the last field if the second last field is empty
//     if (!secondLastOption && options.length > 1) {
//       remove(fields.length - 1);
//     }
//   });

//   // Cleanup subscription on unmount
//   return () => subscription.unsubscribe();
// }, [watch, append, itemIndex]);
