import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { RiTextSnippet } from "@remixicon/react";

function RTInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute top-2 z-10 right-2 p-1 bg-background hover:bg-muted text-muted-foreground transition-colors rounded ">
          <RiTextSnippet className="w-4 h-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <h3 className="font-semibold text-center">Text Editor Features</h3>
        <Separator className="mt-2" />
        <div className="relative max-h-60 overflow-y-scroll no-scrollbar pt-4 box-border">
          <ul className="list-disc px-4 text-sm space-y-2 ">
            <div>
              <li>Rich Text Toolbar 🛠️</li>
              <p className="text-xs text-muted-foreground font-normal">
                Selecting a text will show you a rich text toolbar where you can
                format your text. Alternatively you can use the markdown code to
                format your text. Eg: <code>**bold**</code>,&nbsp;
                <code>*italic*</code> etc.
              </p>
            </div>
            <div>
              <li>Emoji Picker 😀</li>
              <p className="text-xs text-muted-foreground font-normal">
                Typing <code>:</code> will show you an emoji picker. You can
                filter the emoji by it&apos;s name and choose your desired emoji
                by using arrow buttons of your keyboard.
              </p>
            </div>
            <div>
              <li>Mention List 👤</li>
              <p className="text-xs text-muted-foreground font-normal">
                Typing <code>@</code> will show you a list of usernames. You can
                select a username by using arrow buttons of your keyboard.
              </p>
            </div>
            {/* This feature is move to post option */}
            {/* <div>
              <li>Tagging 🏷️</li>
              <p className="text-xs text-muted-foreground font-normal">
                You can add tags to your post by typing <code>#</code>&nbsp;
                following the name of the tag. (Tags are usually located at the
                top of the post content).
              </p>
            </div> */}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default RTInfoPopover;
