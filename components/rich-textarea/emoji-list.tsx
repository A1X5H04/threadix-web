// Too lazy to combine this with the mention list, maybe send a PR? 😜

import React, { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import * as emoji from "node-emoji";
import { CaretPosition, RichTextarea, RichTextareaHandle } from "rich-textarea";

const style = { width: "400px", height: "300px" };

const MAX_LIST_LENGTH = 8;
const MENTION_REG = /:([\-+\w]*)$/;

const EmojiList = ({
  chars,
  index,
  top,
  left,
  complete,
}: {
  chars: { emoji: string; name: string }[];
  index: number;
  top: number;
  left: number;
  complete: (index: number) => void;
}) => {
  return (
    <div
      className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      style={{
        top: top,
        left: left,
      }}
    >
      {chars.map((c, i) => (
        <div
          key={c.name}
          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors animate-in fade-in-45"
          style={{
            padding: "4px",
            ...(index === i && {
              color: "hsl(var(--accent-foreground))",
              background: "hsl(var(--accent))",
            }),
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            complete(i);
          }}
        >
          {`${c.emoji} ${c.name}`}
        </div>
      ))}
    </div>
  );
};

const useEmojiList = (
  ref: React.RefObject<RichTextareaHandle>,
  value: string | undefined
) => {
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    caret: number;
  } | null>(null);
  const [index, setIndex] = useState<number>(0);

  const targetText = pos ? value?.slice(0, pos.caret) : value;
  const match = pos && targetText?.match(MENTION_REG);
  const name = match?.[1] ?? "";
  const filteredEmojis = useMemo(
    () => emoji.search(name).slice(0, MAX_LIST_LENGTH),
    [name]
  );
  const complete = (i: number) => {
    if (!ref.current || !pos) return;
    const selected = filteredEmojis[i].emoji;
    ref.current.setRangeText(
      `${selected} `,
      pos.caret - name.length - 1,
      pos.caret,
      "end"
    );
    setPos(null);
    setIndex(0);
  };

  const emojiKeyDownFn = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!pos || !filteredEmojis.length) return;
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        const nextIndex = index <= 0 ? filteredEmojis.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        const prevIndex = index >= filteredEmojis.length - 1 ? 0 : index + 1;
        setIndex(prevIndex);
        break;
      case "Enter":
        e.preventDefault();
        complete(index);
        break;
      case "Escape":
        e.preventDefault();
        setPos(null);
        setIndex(0);
        break;
      default:
        break;
    }
  };

  const emojiSelectionKeyFn = (caretPos: CaretPosition) => {
    if (
      caretPos.focused &&
      MENTION_REG.test(value?.slice(0, caretPos.selectionStart) || "")
    ) {
      setPos({
        top: caretPos.top + caretPos.height,
        left: caretPos.left,
        caret: caretPos.selectionStart,
      });
      setIndex(0);
    } else {
      setPos(null);
      setIndex(0);
    }
  };

  return {
    emojiKeyDownFn,
    emojiSelectionKeyFn,
    emojiListProps: {
      top: pos?.top,
      left: pos?.left,
      chars: filteredEmojis,
      index,
      complete,
    },
  };
};

export default EmojiList;
export { useEmojiList };
