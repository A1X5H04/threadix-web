import React, { useRef } from "react";
import { CHARACTERS } from "@/mock";
import {
  RichTextarea,
  RichTextareaHandle,
  RichTextareaProps,
} from "rich-textarea";
import { TextareaProps } from "../ui/textarea";
import MentionList, { useMentionList } from "./mention-list";
import { createPortal } from "react-dom";
import ToolbarMenu, { useToolbarMenu } from "./toolbar-menu";

import EmojiList, { useEmojiList } from "./emoji-list";
import { RiTextSnippet } from "@remixicon/react";
import RTInfoPopover from "./info-popover";

function RichTextArea(props: TextareaProps & RichTextareaProps) {
  const { value } = props;
  const textAreaRef = useRef<RichTextareaHandle>(null);
  const {
    mentionKeyDownFn,
    mentionSelectionChangeFn,
    mentionRenderer,
    mentionListProps,
  } = useMentionList(textAreaRef, String(value), CHARACTERS);
  const {
    toolbarSelectionFn,
    optionSelectionFn,
    isToolbarMenuVisible,
    toolbarMenuProps,
  } = useToolbarMenu(textAreaRef, String(value));
  const { emojiKeyDownFn, emojiListProps, emojiSelectionKeyFn } = useEmojiList(
    textAreaRef,
    String(value)
  );

  return (
    <div className="relative">
      <RTInfoPopover>
        <button className="absolute top-2 z-10 right-4 p-1 bg-background hover:bg-muted text-muted-foreground transition-colors rounded ">
          <RiTextSnippet className="w-4 h-4 text-muted-foreground" />
        </button>
      </RTInfoPopover>
      <RichTextarea
        ref={textAreaRef}
        style={{
          width: "100%",
          height: "auto",
        }}
        {...props}
        autoHeight
        onKeyDown={(e) => {
          mentionKeyDownFn(e);
          emojiKeyDownFn(e);
        }}
        onSelectionChange={(e) => {
          mentionSelectionChangeFn(e);
          emojiSelectionKeyFn(e);
          toolbarSelectionFn(e);
        }}
      >
        {mentionRenderer}
      </RichTextarea>

      {mentionListProps.left &&
        mentionListProps.top &&
        createPortal(
          <MentionList
            chars={mentionListProps.chars}
            complete={mentionListProps.complete}
            index={mentionListProps.index}
            left={mentionListProps.left}
            top={mentionListProps.top}
          />,
          document.body
        )}
      {emojiListProps.left &&
        emojiListProps.top &&
        createPortal(
          <EmojiList
            chars={emojiListProps.chars}
            complete={emojiListProps.complete}
            index={emojiListProps.index}
            left={emojiListProps.left}
            top={emojiListProps.top}
          />,
          document.body
        )}
      {isToolbarMenuVisible &&
        createPortal(
          <ToolbarMenu
            onOptionSelect={optionSelectionFn}
            left={toolbarMenuProps.left || 0}
            top={toolbarMenuProps.top || 0}
          />,
          document.body
        )}
    </div>
  );
}

export default RichTextArea;
