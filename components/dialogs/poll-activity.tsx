import React from "react";
import { RiArrowRightSLine } from "@remixicon/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function PollActivity() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="inline-flex items-center">
          View Activity <RiArrowRightSLine className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl max-h-[calc(100vh-6rem)] overflow-y-scroll">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2 pr-2">
            <div className="inline-flex items-center gap-x-2">
              <DialogTitle className="text-base">Poll Activity</DialogTitle>
            </div>

            <Button variant="link" className="px-0">
              Sort By
            </Button>
          </div>
          <DialogDescription className="sr-only">
            View the activity of the post&apos;s poll, including votes and
            results.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PollActivity;
