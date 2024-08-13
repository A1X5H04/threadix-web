import React, { useRef } from "react";
import { CHARACTERS } from "@/mock";
import {
  RichTextarea,
  RichTextareaHandle,
  RichTextareaProps,
  createRegexRenderer,
} from "rich-textarea";
import { TextareaProps } from "../ui/textarea";
import MentionList, { useMentionList } from "./mention-list";
import { createPortal } from "react-dom";
import ToolbarMenu, { useToolbarMenu } from "./toolbar-menu";

import EmojiList, { useEmojiList } from "./emoji-list";
import { RiTextSnippet } from "@remixicon/react";
import RTInfoPopover from "./info-popover";

const Tag = ({ children }: { children: string }) => {
  return (
    <span className="text-xs text-blue-900 hover:underline cursor-default">
      {children}
    </span>
  );
};

function RichTextArea(props: TextareaProps & RichTextareaProps) {
  const { value } = props;
  const textAreaRef = useRef<RichTextareaHandle>(null);
  const {
    mentionRegex,
    mentionKeyDownFn,
    mentionSelectionChangeFn,
    mentionListProps,
  } = useMentionList(textAreaRef, String(value), CHARACTERS);
  const {
    richTextRegex,
    toolbarSelectionFn,
    optionSelectionFn,
    isToolbarMenuVisible,
    toolbarMenuProps,
  } = useToolbarMenu(textAreaRef, String(value));
  const { emojiKeyDownFn, emojiListProps, emojiSelectionKeyFn } = useEmojiList(
    textAreaRef,
    String(value)
  );

  const richTextRenderer = createRegexRenderer([
    [
      mentionRegex,
      {
        background: "hsl(var(--muted))",
        color: "hsl(var(--muted-foreground))",
        borderRadius: "2.5px",
      },
    ],
    [
      richTextRegex.boldReg,
      {
        fontWeight: "bold",
      },
    ],
    [
      richTextRegex.italicReg,
      {
        fontStyle: "italic",
      },
    ],
    [
      richTextRegex.strikeReg,
      {
        textDecoration: "line-through",
      },
    ],
    [
      richTextRegex.monoReg,
      {
        fontFamily: "monospace",
      },
    ],
    [
      richTextRegex.underlineReg,
      {
        textDecoration: "underline",
      },
    ],
    [
      richTextRegex.spoilerReg,
      {
        background: "hsl(var(--muted))",
        color: "hsl(var(--spoiler-foreground))",
        borderRadius: "2.5px",
      },
    ],
  ]);

  return (
    <div className="relative">
      <RTInfoPopover>
        <button className="absolute top-2 z-10 right-2 p-1 bg-background hover:bg-muted text-muted-foreground transition-colors rounded ">
          <RiTextSnippet className="w-4 h-4 text-muted-foreground" />
        </button>
      </RTInfoPopover>
      {/* <div className="flex items-center gap-x-2 gap-y-1 flex-wrap ml-2 mt-2 ">
        {[...Array(15)].map((_, i) => (
          <Tag key={i}>#tag{i}</Tag>
        ))}
      </div> */}
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
        {richTextRenderer}
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
