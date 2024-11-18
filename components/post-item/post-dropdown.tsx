import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  RiBookmark2Fill,
  RiBookmarkLine,
  RiMoreFill,
  RiUserForbidLine,
} from "@remixicon/react";
import toast from "react-hot-toast";

function PostDropdown() {
  const handleSavePost = () => {
    toast.success(
      <div className="flex items-center gap-x-2 justify-between min-w-52">
        <p>Post Saved!</p>
        <Button
          variant="link"
          size="sm"
          className="p-0"
          onClick={() => toast.dismiss()}
        >
          Dismiss
        </Button>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiMoreFill className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60" align="end">
        <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Save Post
          <RiBookmarkLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-between text-red-500"
          onClick={() => toast.error("Feature not yet implemented!")}
        >
          Block User
          <RiUserForbidLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toast.error("Feature not yet implemented!")}
        >
          Not Interested
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            toast(
              <p>
                <b>Post Reported.</b>
                <br />
                <span className="text-xs text-muted-foreground">
                  Just Kidding... I don&apos;t have people to review posts lol
                </span>
              </p>
            )
          }
        >
          Report Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostDropdown;
