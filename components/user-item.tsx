import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { RiUser4Fill } from "@remixicon/react";

function UserItem() {
  return (
    <div className="w-full flex items-center justify-between p-3">
      <div className="inline-flex items-center">
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Felix" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="ml-3 gap-x-2">
          <h3 className="font-semibold inline-flex items-center">
            Felix
            {/* <span className="text-xs text-muted-foreground ml-2 inline-flex text-emerald-600">
              Follows You
            </span> */}
          </h3>
          <p className="text-sm text-muted-foreground">
            feliboy ·&nbsp;
            <span className="text-foreground text-xs">246 Followers</span>
          </p>
        </div>
      </div>
      <Button>Follow</Button>
    </div>
  );
}

export default UserItem;
