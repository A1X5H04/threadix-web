import React from "react";
import { Button } from "../ui/button";
import { RiShareForwardLine } from "@remixicon/react";
import { Dialog } from "../ui/dialog";

function ShareDialog() {
  return (
    <Dialog>
      <Button variant="ghost" size="icon">
        <RiShareForwardLine className="w-5 h-5 text-muted-foreground" />
      </Button>
    </Dialog>
  );
}

export default ShareDialog;
