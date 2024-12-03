import { RiSpam3Fill } from "@remixicon/react";
import React from "react";

function BlockedOverlay({ name }: { name: string }) {
  return (
    <div className="w-full h-full absolute inset-0 bg-background/75 backdrop-blur-md z-40">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <RiSpam3Fill className="w-20 h-20 text-muted-foreground mb-5" />
        <h3 className="text-lg font-semibold">{name} has blocked you</h3>
        <p className="text-sm text-muted-foreground">
          You can&apos;t see their posts or interact with them.
        </p>
      </div>
    </div>
  );
}

export default BlockedOverlay;
