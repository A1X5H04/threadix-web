import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { PollSchema } from "@/types";
import { cn } from "@/lib/utils";

interface PollFormProps {
  poll?: PollSchema | undefined;
  setPoll: (poll: PollSchema) => void;
  setPollForm: (state: boolean) => void;
}

const placeholders = ["Hell Yeah", "Nah", "Maybe"];

function PollForm({ poll, setPoll, setPollForm }: PollFormProps) {
  const [pollOptions, setPollOptions] = React.useState<PollSchema["options"]>([
    { title: "", isCorrect: false },
    { title: "", isCorrect: false },
  ]);

  useEffect(() => {
    setPoll({ ...poll, options: pollOptions });
  }, [pollOptions, setPoll]);

  const handleInputChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index].title = value;
    setPollOptions(newOptions);

    const allFilled = newOptions.every((option) => option.title !== "");
    if (allFilled && newOptions.length < 4) {
      setPollOptions([...newOptions, { title: "", isCorrect: false }]);
    } else if (
      newOptions.length > 2 &&
      newOptions[newOptions.length - 1].title === ""
    ) {
      setPollOptions(newOptions.slice(0, -1));
    }
  };

  return (
    <div className="px-2 space-y-2">
      {pollOptions.map((option, index) => (
        <div key={index} className="flex items-center space-y-2">
          <Input
            placeholder={
              index === pollOptions.length - 1
                ? "Add another option"
                : placeholders[index]
            }
            value={option.title}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={cn(
              index === pollOptions.length - 1 &&
                pollOptions.at(index)?.title === "" &&
                "border-dashed"
            )}
          />
        </div>
      ))}
      <div className="w-full flex justify-between">
        <span className="text-xs text-muted-foreground">Ends in 5h</span>
        <span
          onClick={() => setPollForm(false)}
          className="text-xs text-muted-foreground font-semibold cursor-pointer"
        >
          Remove Poll
        </span>
      </div>
    </div>
  );
}

export default PollForm;
