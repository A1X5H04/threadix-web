import React, { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CHARACTERS } from "@/mock";
import {
  CaretPosition,
  createRegexRenderer,
  RichTextarea,
  RichTextareaHandle,
} from "rich-textarea";

const style = { width: "475px", height: "200px" };

const MAX_LIST_LENGTH = 8;
const MENTION_REG = /\B@([\-+\w]*)$/;
// /\B(@[a-z])([\-+\w]*)$/;

//

const MENTION_HIGHLIGHT_REG = new RegExp(
  `(${CHARACTERS.map((c) => `@${c}`).join("|")})`,
  "g"
);
const mentionRenderer = createRegexRenderer([
  [
    MENTION_HIGHLIGHT_REG,
    { background: "#EAF5F9", color: "#4276AA", borderRadius: "3px" },
  ],
]);

const Menu = ({
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
        top: top,
        left: left,
      }}
    >
      <p className="border-b text-xs p-1">Mention a user</p>
      <hr />
      {chars.map((c, i) => (
        <div
          key={c}
          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors animate-in fade-in-45"
          style={{
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
          {c}
        </div>
      ))}
    </div>
  );
};

export const Mention = () => {
  const ref = useRef<RichTextareaHandle>(null);
  const [text, setText] = useState(
    `Hi, @Captain Gregor and @Jaxxon . Please enter @ to show suggestions.\n\n`
  );
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    caret: number;
  } | null>(null);
  const [index, setIndex] = useState<number>(0);

  const targetText = pos ? text.slice(0, pos.caret) : text;
  const match = pos && targetText.match(MENTION_REG);
  const name = match?.[0] ?? "";
  const filtered = useMemo(
    () =>
      CHARACTERS.filter((c) =>
        c.toLowerCase().includes(name.toLowerCase())
      ).slice(0, MAX_LIST_LENGTH),
    [name]
  );
  console.log(name);
  const complete = (i: number) => {
    if (!ref.current || !pos) return;
    const selected = filtered[i];
    ref.current.setRangeText(
      `@${selected} `,
      pos.caret - name.length - 1,
      pos.caret,
      "end"
    );
    setPos(null);
    setIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!pos || !filtered.length) return;
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        const nextIndex = index <= 0 ? filtered.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        const prevIndex = index >= filtered.length - 1 ? 0 : index + 1;
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

  const handleSelectionChange = (caretPos: CaretPosition) => {
    if (
      caretPos.focused &&
      MENTION_REG.test(text.slice(0, caretPos.selectionStart))
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

  return (
    <div>
      <RichTextarea
        ref={ref}
        style={style}
        onChange={(e) => setText(e.target.value)}
        className="flex min-h-[60px] w-96 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={text}
        onKeyDown={handleKeyDown}
        onSelectionChange={handleSelectionChange}
      >
        {mentionRenderer}
      </RichTextarea>
      {pos &&
        createPortal(
          <Menu
            top={pos.top}
            left={pos.left}
            chars={filtered}
            index={index}
            complete={complete}
          />,
          document.body
        )}
    </div>
  );
};
