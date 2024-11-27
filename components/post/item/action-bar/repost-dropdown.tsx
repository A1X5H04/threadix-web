import React, { useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  RiChatQuoteLine,
  RiRepeat2Line,
  RiRepeatOneFill,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { repost, unRepost } from "@/actions/post/repost";
import { useToast } from "@/components/ui/use-toast";
import toast from "react-hot-toast";

interface RepostDropdownProps {
  reposts: number;
  hasPermission: boolean;
  postId: string;
  openQuoteModal: () => void;
  initialIsReposted: boolean;
}

function RepostDropdown({
  reposts,
  hasPermission,
  postId,
  openQuoteModal,
  initialIsReposted,
}: RepostDropdownProps) {
  // Using local state to update the repost button immediately, there can be a better way to do this
  const [isReposted, setIsReposted] = React.useState(initialIsReposted);
  const [isReposting, startReposting] = useTransition();

  const handleRepost = () => {
    if (isReposted) {
      startReposting(() => {
        unRepost(postId)
          .then(() => {
            toast.success("Remove from reposts successfully");
            setIsReposted(false);
          })
          .catch(() => {
            toast.error("Failed to unrepost the post");
            setIsReposted(initialIsReposted);
          });
      });
    } else {
      startReposting(() => {
        repost(postId)
          .then(() => {
            toast.success("Reposted successfully");
            setIsReposted(true);
          })
          .catch(() => {
            toast.error("Failed to repost the post");
            setIsReposted(initialIsReposted);
          });
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          isWrappedInLink
          variant="ghost"
          size="icon"
          disabled={isReposting}
          isLoading={isReposting}
        >
          {isReposted ? (
            <RiRepeatOneFill className="w-5 h-5 text-foreground" />
          ) : (
            <RiRepeat2Line className="w-5 h-5 text-muted-foreground" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {hasPermission && (
          <DropdownMenuItem onClick={openQuoteModal}>
            <RiChatQuoteLine className="w-4 h-4 mr-2" /> Quote
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={handleRepost}
          className={cn(isReposted && "text-red-500")}
        >
          <RiRepeat2Line className="w-4 h-4 mr-2" />
          {isReposted ? "Remove" : "Repost"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default RepostDropdown;
