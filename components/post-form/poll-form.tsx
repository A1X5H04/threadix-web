import React, { useCallback, useEffect } from "react";
import { Input } from "../ui/input";
import { PollSchema, PostSchema } from "@/types";
import { cn } from "@/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDownSLine } from "@remixicon/react";

const placeholders = ["Yeah", "Nah"];

function PollForm({
  itemIndex,
  watchedPoll,
}: {
  itemIndex: number;
  watchedPoll: PollSchema;
}) {
  const { getValues, setValue, control } = useFormContext<{
    posts: PostSchema[];
  }>();

  const { fields, append, remove } = useFieldArray<{ posts: PostSchema[] }>({
    name: `posts.${itemIndex}.poll.options`,
  });

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

  useEffect(() => {
    const lastOption =
      watchedPoll.options[watchedPoll.options.length - 1]?.title;
    const secondLastOption =
      watchedPoll.options[watchedPoll.options.length - 2]?.title;

    // Append a new field if the last option is not empty and the number of fields is less than 4
    if (lastOption && watchedPoll.options.length < 4) {
      append({ title: "" }, { shouldFocus: false });
    }

    // Remove the last field if the second last field is empty
    if (!secondLastOption && watchedPoll.options.length > 3) {
      remove(fields.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedPoll.options, append, remove]);

  const handleRadioChange = useCallback(
    (value: string) => {
      fields.forEach((_, index) => {
        setValue(
          `posts.${itemIndex}.poll.options.${index}.isCorrect`,
          index === parseInt(value)
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, itemIndex]
  );

  return (
    <div className="overflow-hidden p-1">
      <div className="space-y-2 mb-4">
        <RadioGroup
          onValueChange={handleRadioChange}
          defaultValue={"0"}
          className="flex flex-col space-y-1"
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
                            : placeholders[idx]
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                          }
                        }}
                        className={cn(
                          idx === fields.length - 1 &&
                            field.value == "" &&
                            "border-dashed"
                        )}
                      />
                    </FormControl>
                    {field.value !== "" &&
                      getValues(`posts.${itemIndex}.poll`)?.quizMode ==
                        true && (
                        <RadioGroupItem
                          className="absolute bottom-[11px] right-4"
                          value={`${idx}`}
                        />
                      )}
                  </FormItem>
                )}
              />
              {/* {getValues(`posts.${itemIndex}.poll.options.${idx}.title`) &&
                getValues(`posts.${itemIndex}.poll`)?.quizMode == true && (
                  <RadioGroupItem
                    className="absolute bottom-[11px] right-4"
                    value={`${idx}`}
                  />
                )} */}
            </div>
          ))}
        </RadioGroup>
        <div className="w-full flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="inline-flex items-center gap-x-1 text-xs text-muted-foreground hover:bg-muted py-1 px-1.5 rounded-sm">
                Ends in {getValues(`posts.${itemIndex}.poll.duration`)}
                <RiArrowDownSLine className="w-4 h-4" />
              </span>
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
          <TooltipProvider>
            <div className="inline-flex items-center gap-x-2">
              <Tooltip>
                <TooltipTrigger>
                  <button
                    type="button"
                    disabled={getValues(
                      `posts.${itemIndex}.poll.multipleAnswers`
                    )}
                    onClick={() => {
                      if (getValues(`posts.${itemIndex}.poll.multipleAnswers`))
                        return;
                      setValue(
                        `posts.${itemIndex}.poll.quizMode`,
                        !getValues(`posts.${itemIndex}.poll.quizMode`)
                      );
                    }}
                    className={cn(
                      "text-xs text-muted-foreground hover:bg-muted rounded-sm py-1 px-1.5",
                      getValues(`posts.${itemIndex}.poll.multipleAnswers`) &&
                        "opacity-25 cursor-default",
                      getValues(`posts.${itemIndex}.poll.quizMode`) &&
                        "text-foreground font-semibold bg-muted "
                    )}
                  >
                    Quiz
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  Let users select the correct answer.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    type="button"
                    disabled={getValues(`posts.${itemIndex}.poll.quizMode`)}
                    onClick={() => {
                      if (getValues(`posts.${itemIndex}.poll.quizMode`)) return;
                      setValue(
                        `posts.${itemIndex}.poll.multipleAnswers`,
                        !getValues(`posts.${itemIndex}.poll.multipleAnswers`)
                      );
                    }}
                    className={cn(
                      "text-xs text-muted-foreground hover:bg-muted rounded-sm py-1 px-1.5",
                      getValues(`posts.${itemIndex}.poll.quizMode`) &&
                        "opacity-25 cursor-default",
                      getValues(`posts.${itemIndex}.poll.multipleAnswers`) &&
                        "text-foreground font-semibold bg-muted "
                    )}
                  >
                    Multiple
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  Allow users to pick multiple answers.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        `posts.${itemIndex}.poll.anonymousVoting`,
                        !getValues(`posts.${itemIndex}.poll.anonymousVoting`)
                      );
                    }}
                    className={cn(
                      "text-xs text-muted-foreground hover:bg-muted rounded-sm py-1 px-1.5",
                      getValues(`posts.${itemIndex}.poll.anonymousVoting`) &&
                        "text-foreground font-semibold bg-muted "
                    )}
                  >
                    Anonymous
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  Collect responses without user identities.
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
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
