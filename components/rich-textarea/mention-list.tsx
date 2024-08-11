import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";

import {
  CaretPosition,
  createRegexRenderer,
  Renderer,
  RichTextareaHandle,
} from "rich-textarea";

const MAX_LIST_LENGTH = 8;
const MENTION_REG = /\B@([\-+\w]*)$/;
// /\B(@[a-z])([\-+\w]*)$/;

//

const MentionList = ({
  chars,
  index,
  top,
  left,
  complete,
}: {
  chars: string[];
  index: number;
  top: number;
  left: number;
  complete: (index: number) => void;
}) => {
  return (
    <div
      className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
      style={{
        top: top + 10,
        left: left,
      }}
    >
      {chars.length > 0 ? (
        chars.map((c, i) => (
          <li
            key={c}
            className={cn(
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors animate-in fade-in-45",
              index === i && "bg-accent text-accent-foreground"
            )}
            onMouseDown={(e) => {
              e.preventDefault();
              complete(i);
            }}
          >
            {c}
          </li>
        ))
      ) : (
        <span className="text-sm p-2 text-center text-muted-foreground">
          No matching username found!
        </span>
      )}
    </div>
  );
};

interface RenderMentionProps {
  mentionRenderer: Renderer;
  mentionKeyDownFn: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  mentionSelectionChangeFn: (caretPos: CaretPosition) => void;
  mentionListProps: {
    chars: string[];
    index: number;
    complete: (index: number) => void;
    top: number | undefined;
    left: number | undefined;
  };
}

function useMentionList(
  ref: React.RefObject<RichTextareaHandle>,
  value: string | undefined,
  usernames: string[]
): RenderMentionProps {
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    caret: number;
  } | null>(null);
  const [index, setIndex] = useState<number>(0);

  const MENTION_HIGHLIGHT_REG = new RegExp(
    `(${usernames.map((c) => `@${c}`).join("|")})`,
    "g"
  );

  const mentionRenderer = createRegexRenderer([
    [
      MENTION_HIGHLIGHT_REG,
      {
        background: "hsl(var(--muted))",
        color: "hsl(var(--muted-foreground))",
        borderRadius: "2.5px",
      },
    ],
  ]);

  const targetText = pos ? value?.slice(0, pos.caret) : value;
  const match = pos && targetText?.match(MENTION_REG);
  const name = match?.[1] ?? "";
  const filteredUsernames = useMemo(
    () =>
      usernames
        .filter((c) => c.toLowerCase().includes(name.toLowerCase()))
        .slice(0, MAX_LIST_LENGTH),
    [usernames, name]
  );
  const complete = (i: number) => {
    if (!ref.current || !pos) return;
    const selected = filteredUsernames[i];
    ref.current.setRangeText(
      `@${selected} `,
      pos.caret - name.length - 1,
      pos.caret,
      "end"
    );
    setPos(null);
    setIndex(0);
  };

  const mentionKeyDownFn = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!pos || !filteredUsernames.length) return;
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        const nextIndex = index <= 0 ? filteredUsernames.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        const prevIndex = index >= filteredUsernames.length - 1 ? 0 : index + 1;
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

  const mentionSelectionChangeFn = (caretPos: CaretPosition) => {
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
    mentionRenderer,
    mentionKeyDownFn,
    mentionSelectionChangeFn,
    mentionListProps: {
      chars: filteredUsernames,
      index,
      complete,
      top: pos?.top,
      left: pos?.left,
    },
  };
}

export default MentionList;
export { useMentionList };