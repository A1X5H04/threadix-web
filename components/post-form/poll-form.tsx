import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { PollSchema, PostSchema } from "@/types";
import { cn } from "@/lib/utils";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useSwitchTransition } from "transition-hooks";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const placeholders = ["Yeah", "Nah"];

function PollForm({ itemIndex }: { itemIndex: number }) {
  const [settings, setSettings] = React.useState(false);

  const { getValues, setValue, control } = useFormContext<{
    posts: PostSchema[];
  }>();
  const watchedOption = useWatch({
    name: `posts.${itemIndex}.poll.options`,
    control,
  }) as PollSchema["options"];

  const { fields, append, remove } = useFieldArray<{ posts: PostSchema[] }>({
    name: `posts.${itemIndex}.poll.options`,
  });

  useEffect(() => {
    const lastOption = watchedOption?.[watchedOption?.length - 1]?.title;
    const secondLastOption = watchedOption?.[watchedOption?.length - 2]?.title;

    // Append a new field if the last option is not empty and the number of fields is less than 4
    if (lastOption && watchedOption.length < 4) {
      append({ title: "" }, { shouldFocus: false });
    }

    // Remove the last field if the second last field is empty
    if (!secondLastOption && watchedOption.length > 3) {
      remove(fields.length - 1);
    }
  }, [watchedOption, append, remove]);

  const handleRadioChange = (value: string) => {
    fields.forEach((field, index) => {
      setValue(
        `posts.${itemIndex}.poll.options.${index}.isCorrect`,
        index === parseInt(value)
      );
    });
  };

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
                  </FormItem>
                )}
              />
              {idx !== fields.length - 1 &&
                getValues(`posts.${itemIndex}.poll`)?.quizMode == true && (
                  <RadioGroupItem
                    className="absolute bottom-[11px] right-4"
                    value={`${idx}`}
                  />
                )}
            </div>
          ))}
        </RadioGroup>
        <div className="w-full flex justify-between">
          <div className="inline-flex items-center gap-x-2">
            <span className="text-xs text-muted-foreground">
              Ends in {getValues(`posts.${itemIndex}.poll.duration`)}
            </span>
            &middot;
            <span
              role="button"
              onClick={() => {
                if (getValues(`posts.${itemIndex}.poll.multipleAnswers`)) {
                  setValue(`posts.${itemIndex}.poll.multipleAnswers`, false);
                }
                setValue(
                  `posts.${itemIndex}.poll.quizMode`,
                  !getValues(`posts.${itemIndex}.poll.quizMode`)
                );
              }}
              className={cn(
                "text-xs text-muted-foreground hover:bg-muted rounded-md py-0.5 px-1.5",
                getValues(`posts.${itemIndex}.poll.quizMode`) &&
                  "text-foreground font-semibold bg-muted "
              )}
            >
              Quiz
            </span>
            <span
              role="button"
              onClick={() => {
                if (getValues(`posts.${itemIndex}.poll.quizMode`)) {
                  setValue(`posts.${itemIndex}.poll.quizMode`, false);
                }
                setValue(
                  `posts.${itemIndex}.poll.multipleAnswers`,
                  !getValues(`posts.${itemIndex}.poll.multipleAnswers`)
                );
              }}
              className={cn(
                "text-xs text-muted-foreground hover:bg-muted rounded-md py-0.5 px-1.5",
                getValues(`posts.${itemIndex}.poll.multipleAnswers`) &&
                  "text-foreground font-semibold bg-muted "
              )}
            >
              Multiple
            </span>
            <span
              role="button"
              onClick={() => {
                setValue(
                  `posts.${itemIndex}.poll.anonymousVoting`,
                  !getValues(`posts.${itemIndex}.poll.anonymousVoting`)
                );
              }}
              className={cn(
                "text-xs text-muted-foreground hover:bg-muted rounded-md py-0.5 px-1.5",
                getValues(`posts.${itemIndex}.poll.anonymousVoting`) &&
                  "text-foreground font-semibold bg-muted "
              )}
            >
              Anonymous
            </span>
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
