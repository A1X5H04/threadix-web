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
  RiDeleteBin2Line,
  RiEyeOffLine,
  RiLinkM,
  RiMoreFill,
  RiPencilLine,
  RiUserForbidLine,
} from "@remixicon/react";
import toast from "react-hot-toast";

interface PostDropdownProps {
  isCurrentUser: boolean;
}

function PostDropdown({ isCurrentUser }: PostDropdownProps) {
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
          View
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
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Save Post
          <RiBookmarkLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Copy Link
          <RiLinkM className="w-4 h-4" />
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Edit Post
          <RiPencilLine className="w-4 h-4" />
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="justify-between"
          onClick={() => toast.error("Feature not yet implemented!")}
        >
          Not Interested
          <RiEyeOffLine className="w-4 h-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-between text-red-500"
          onClick={() => toast.error("Feature not yet implemented!")}
        >
          Block User
          <RiUserForbidLine className="w-4 h-4" />
        </DropdownMenuItem>
        {/* <DropdownMenuItem
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
        </DropdownMenuItem> */}

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSavePost}
          className="justify-between text-red-500"
        >
          Delete Post
          <RiDeleteBin2Line className="w-4 h-4" />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostDropdown;
