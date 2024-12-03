import React from "react";
import { Button } from "../ui/button";
import { RiShareForwardLine, RiWhatsappFill } from "@remixicon/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button isWrappedInLink variant="ghost" size="icon">
          <RiShareForwardLine className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        <Tabs>
          <TabsList>
            <TabsTrigger value="whatsapp" className="gap-x-2">
              <RiWhatsappFill className="w-4 h-4 text-muted-foreground" />
              Whatsapp
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default ShareDialog;
