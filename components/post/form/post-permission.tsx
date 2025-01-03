import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ThreadSchema } from ".";

function PostPermission() {
  const { getValues, setValue } = useFormContext<ThreadSchema>();
  const [permission, setPermission] = React.useState(
    getValues("reply") || "anyone"
  );

  let value = "Everyone can reply & quote";
  switch (permission) {
    case "followers":
      value = "Profiles only following you can reply & quote";
      break;
    case "mentions":
      value = "Only mentioned profiles can reply & quote";
      break;
    default:
      break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="inline-flex items-center text-sm"
        >
          {value}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Who can reply & quote ?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={permission}
          onValueChange={(value) => {
            setValue("reply", value as "anyone" | "followers" | "mentions");
            setPermission(value as "anyone" | "followers" | "mentions");
          }}
        >
          <DropdownMenuRadioItem value="anyone">Anyone</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="followers">
            Profiles following you
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="mentions">
            Mentioned only
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostPermission;
