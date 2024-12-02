import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import {
  RiBookmark2Fill,
  RiBookmarkLine,
  RiDeleteBin2Line,
  RiEyeOffFill,
  RiEyeOffLine,
  RiLinkM,
  RiMoreFill,
  RiPencilLine,
  RiUserForbidLine,
  RiUserUnfollowLine,
} from "@remixicon/react";
import toast from "react-hot-toast";

interface PostDropdownProps {
  userId?: string;
  isCurrentUser: boolean;
}

function PostDropdown({ userId, isCurrentUser }: PostDropdownProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied!");
  };

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
        <Button
          onClick={(e) => e.preventDefault()}
          variant="ghost"
          size="icon"
          className="-mb-4 size-7 rounded-sm"
        >
          <RiMoreFill className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.preventDefault()}
        className="min-w-48"
        align="end"
      >
        <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Save Post
          <RiBookmarkLine className="w-4 h-4" />
        </DropdownMenuItem>

        {isCurrentUser && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Who can reply & quote</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={"top"}
                    onValueChange={() => {}}
                  >
                    <DropdownMenuRadioItem value="top">
                      Anyone
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      Followers
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      Mentions
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem
              onClick={() => toast.error("Feature not yet implemented!")}
              className="justify-between text-red-500"
            >
              Delete Post
              <RiDeleteBin2Line className="w-4 h-4" />
            </DropdownMenuItem>
          </>
        )}
        {!isCurrentUser && (
          <>
            <DropdownMenuItem
              onClick={() => toast.error("Feature not yet implemented!")}
              className="justify-between"
            >
              Not Interested
              <RiEyeOffLine className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast.error("Feature not yet implemented!")}
              className="justify-between"
            >
              Mute User
              <RiUserUnfollowLine className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast.error("Feature not yet implemented!")}
              className="text-red-500 justify-between"
            >
              Block User
              <RiUserForbidLine className="w-4 h-4" />
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyLink} className="justify-between">
          Copy Link
          <RiLinkM className="w-4 h-4" />
        </DropdownMenuItem>

        {/* <DropdownMenuItem onClick={handleSavePost} className="justify-between">
          Edit Post
          <RiPencilLine className="w-4 h-4" />
        </DropdownMenuItem> */}
        {/* <DropdownMenuSeparator />

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
        </DropdownMenuItem> */}
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
