import React from "react";
import { UseFieldArrayAppend, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ThreadSchema } from ".";
import { User } from "lucia";

function AddThread({
  append,
  user,
}: {
  append: UseFieldArrayAppend<ThreadSchema>;
  user: User;
}) {
  const watchForm = useWatch({
    name: "posts",
  });
  const inputLength = watchForm[watchForm.length - 1].content?.length ?? 0;

  return (
    <div className="flex gap-3 mt-2">
      <div className="flex justify-center items-center h-full w-9">
        <Avatar
          className={cn(
            "size-6 ",
            inputLength < 1 ? "opacity-75" : "opacity-100"
          )}
        >
          <AvatarImage src={user.avatar ?? undefined} />
          <AvatarFallback>{user.username.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <button
        disabled={inputLength < 1}
        onClick={() =>
          append({
            content: "",
            poll: undefined,
            media: [],
          })
        }
        className={cn(
          "text-sm text-muted-foreground hover:text-foreground ",
          inputLength < 1 && "cursor-not-allowed text-muted"
        )}
      >
        Add to thread
      </button>
    </div>
  );
}

export default AddThread;
