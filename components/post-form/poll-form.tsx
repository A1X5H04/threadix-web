import React from "react";
import { Input } from "../ui/input";
import { PollSchema } from "@/types";

interface PollFormProps {
  poll?: PollSchema | undefined;
  setPoll: (poll: PollSchema) => void;
  setPollForm: (state: boolean) => void;
}

function PollForm({ poll, setPoll, setPollForm }: PollFormProps) {

  return (
    <div className="px-2 space-y-2">
      {["Option 1", "Option 2"].map((option, index) => (
        <div key={index} className="flex items-center space-y-2">
          <Input placeholder={option} />
        </div>
      ))}
      <Input placeholder="Add Option" />
      <div className="w-full flex justify-between">
        <span className="text-xs text-muted-foreground">Ends in 5h</span>
        <span
          onClick={() => setPollForm(false)}
          className="text-xs text-muted-foreground"
        >
          Remove Poll
        </span>
      </div>
    </div>
  );
}

export default PollForm;
