import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucia";
import { formatDate, formatRelativeDate } from "@/lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserInfoDialog({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: Pick<User, "id" | "name" | "username" | "avatar"> & {
    email: string;
    createdAt: string;
  };
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>User Info</DialogTitle>
        </DialogHeader>
        <div className="flex gap-x-2 w-full items-center ">
          <div className="border-b py-2 flex-1">
            <p className="text-muted-foreground font-bold mb-1 text-sm">Name</p>
            <p className="inline-flex  items-center gap-x-1">
              {user.name}
              <span className="text-sm text-muted-foreground">
                @{user.username}
              </span>
            </p>
          </div>
          <Avatar className="size-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="border-b py-2">
          <p className="text-muted-foreground font-bold mb-1 text-sm">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="border-b py-1">
          <p className="text-muted-foreground font-bold mb-1 text-sm">
            Joined At
          </p>
          <p>
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UserInfoDialog;
