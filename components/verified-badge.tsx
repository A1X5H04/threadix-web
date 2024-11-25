import React from "react";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { User } from "@/types/api-responses/common";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  user: {
    name: string;
    isVerified: boolean;
  };
  iconClassName?: string;
}

function VerifiedBadge({ user, iconClassName }: VerifiedBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://github.com/A1X5H04/caskade-web?tab=readme-ov-file#getting-verified"
            target="_blank"
          >
            <RiVerifiedBadgeFill
              className={cn("-ml-1 size-4", iconClassName)}
            />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs font-semibold">
            {user.name} is <b>Verified</b> user.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default VerifiedBadge;