import React, { useRef } from "react";

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
import { Username } from "@/types";
import HashTagList, { useHashTagList } from "./hashtags-list";

interface RichTextAreaProps
  extends Omit<TextareaProps, "children">,
    RichTextareaProps {
  lists: { usernames: Username[]; tags: string[] };
  fieldIndex: number;
}

function RichTextArea(props: RichTextAreaProps) {
  const { value, fieldIndex, lists } = props;
  const textAreaRef = useRef<RichTextareaHandle>(null);
  const {
    mentionRegex,
    mentionKeyDownFn,
    mentionSelectionChangeFn,
    mentionListProps,
  } = useMentionList(textAreaRef, String(value), lists.usernames, fieldIndex);
  const {
    hashtagRegex,
    hashtagKeyDownFn,
    hashtagSelectionChangeFn,
    hashtagListProps,
  } = useHashTagList(textAreaRef, String(value), lists.tags, fieldIndex);
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
      hashtagRegex,
      {
        color: "#1D4ED8",
        textDecoration: "underline",
      },
    ],
  ]);

  return (
    <div>
      <RichTextarea
        id="rich-textarea"
        ref={textAreaRef}
        style={{
          width: "100%",
          height: "auto",
        }}
        {...props}
        autoHeight
        onKeyDown={(e) => {
          hashtagKeyDownFn(e);
          mentionKeyDownFn(e);
          emojiKeyDownFn(e);
        }}
        onSelectionChange={(e) => {
          mentionSelectionChangeFn(e);
          hashtagSelectionChangeFn(e);
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
          document.getElementById("rich-textarea") || document.body
        )}
      {hashtagListProps.left &&
        hashtagListProps.top &&
        createPortal(
          <HashTagList
            name={hashtagListProps.name}
            chars={hashtagListProps.chars}
            complete={hashtagListProps.complete}
            index={hashtagListProps.index}
            left={hashtagListProps.left}
            top={hashtagListProps.top}
          />,
          document.getElementById("rich-textarea") || document.body
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
          document.getElementById("rich-textarea") || document.body
        )}
      {isToolbarMenuVisible &&
        createPortal(
          <ToolbarMenu
            onOptionSelect={optionSelectionFn}
            left={toolbarMenuProps.left || 0}
            top={toolbarMenuProps.top || 0}
          />,
          document.getElementById("rich-textarea") || document.body
        )}
    </div>
  );
}

export default RichTextArea;
