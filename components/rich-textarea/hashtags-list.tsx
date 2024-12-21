import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";

import { CaretPosition, RichTextareaHandle } from "rich-textarea";

import { useFormContext } from "react-hook-form";
import { ThreadSchema } from "../post/form";
import { RiHashtag } from "@remixicon/react";

const MAX_LIST_LENGTH = 8;
const HASHTAG_REG = /\B#([\-+\w]*)$/;
// /\B#([a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?)$/; // Matches hashtags with spaces
// /\B(@[a-z])([\-+\w]*)$/;

interface HashTagListProps {
  name: string;
  chars: string[];
  index: number;
  top: number;
  left: number;
  complete: (index: number, value?: string) => void;
}

const HashTagList = ({
  name,
  chars,
  index,
  top,
  left,
  complete,
}: HashTagListProps) => {
  return (
    <div
      className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
      style={{
        top: top + 10,
        left: left,
      }}
    >
      {/* <p className="text-sm p-2 font-semibold border-b">
        Add a subject to your post
      </p> */}
      <ul className="p-1">
        {chars.length > 0 ? (
          chars.map((c, i) => (
            <li
              key={c}
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors animate-in fade-in-45",
                index === i && "bg-accent text-accent-foreground"
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                complete(i);
              }}
            >
              <div className="flex items-center gap-x-2">
                <RiHashtag className="size-5" />
                <p>{c}</p>
              </div>
            </li>
          ))
        ) : (
          <li
            onMouseDown={(e) => {
              e.preventDefault();
              complete(-1, name);
            }}
            className={cn(
              "relative flex flex-col items-start cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors animate-in fade-in-45",
              index === -1 && "bg-accent text-accent-foreground"
            )}
          >
            <h5>{name}</h5>
            <span className="text-xs text-center text-muted-foreground font-normal">
              Add a new subject
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

interface RenderHashTagProps {
  hashtagRegex: RegExp;
  hashtagKeyDownFn: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  hashtagSelectionChangeFn: (caretPos: CaretPosition) => void;
  hashtagListProps: {
    name: string;
    chars: string[];
    index: number;
    complete: (index: number, value?: string) => void;
    top: number | undefined;
    left: number | undefined;
  };
}

function useHashTagList(
  ref: React.RefObject<RichTextareaHandle>,
  value: string | undefined,
  tags: string[],
  formIndex: number
): RenderHashTagProps {
  const { getValues, setValue } = useFormContext<ThreadSchema>();
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    caret: number;
  } | null>(null);
  const [hashtags, setHashTags] = useState<string[]>(tags);
  const [index, setIndex] = useState<number>(0);
  const hashtagRegex = useMemo(() => {
    if (hashtags.length === 0) return new RegExp(`(?!x)x`, "g"); // Default regex that won't match anything
    return new RegExp(`(${hashtags.map((tag) => `#${tag}`).join("|")})`, "g");
  }, [hashtags]);

  const tagValues = getValues(`posts.${formIndex}.tags`);

  const targetText = pos ? value?.slice(0, pos.caret) : value;
  const match = pos && targetText?.match(HASHTAG_REG);
  const name = match?.[1] ?? "";
  const filteredHashtags = useMemo(
    () =>
      hashtags
        .filter(
          (tag) =>
            !tagValues?.includes(tag!) &&
            tag.toLowerCase().includes(name.toLowerCase())
        )
        .slice(0, MAX_LIST_LENGTH),
    [hashtags, name, tagValues]
  );
  const complete = (i: number, value?: string) => {
    if (!ref.current || !pos) return;

    if (i === -1 && value) {
      setHashTags((prev) => [...prev, value]);

      console.log("Added new tag:", value);

      ref.current.setRangeText(
        `#${value} `,
        pos.caret - name.length - 1,
        pos.caret,
        "end"
      );
      setValue(
        `posts.${formIndex}.tags`,
        tagValues ? [...tagValues, value] : [value]
      );
      console.log("Tags:", getValues(`posts.${formIndex}.tags`));
      setPos(null);
      setIndex(0);
      return;
    }
    console.log("Filtered hashtags:", filteredHashtags);

    const selected = filteredHashtags[i];
    ref.current.setRangeText(
      `#${selected} `,
      pos.caret - name.length - 1,
      pos.caret,
      "end"
    );

    setValue(
      `posts.${formIndex}.tags`,
      tagValues ? [...tagValues, selected] : [selected]
    );
    console.log("Tags:", getValues(`posts.${formIndex}.tags`));
    setPos(null);
    setIndex(0);
  };

  const hashtagKeyDownFn = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace") {
      const textarea = ref.current;
      if (!textarea || !value) return;

      const cursorPosition = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const textBeforeCursor = value.slice(0, cursorPosition);

      const hashTagMatch = textBeforeCursor.match(hashtagRegex);

      if (hashTagMatch) {
        const lastHashtag = hashTagMatch[hashTagMatch.length - 1];
        const hashTagsStartIndex = textBeforeCursor.lastIndexOf(lastHashtag);

        if (cursorPosition === hashTagsStartIndex + lastHashtag.length) {
          e.preventDefault();

          textarea.setRangeText(
            "",
            hashTagsStartIndex,
            cursorPosition,
            "select"
          );
          const hashTags = getValues(`posts.${formIndex}.tags`)?.filter(
            (m) => m !== lastHashtag.slice(1)
          );
          setValue(`posts.${formIndex}.tags`, hashTags);
          console.log(
            "Removed hashTags:",
            getValues(`posts.${formIndex}.tags`)
          );
        }
      }

      // Handle selection case
      if (cursorPosition !== selectionEnd) {
        const selectedText = value.slice(cursorPosition, selectionEnd);
        const selectedhashTagsMatch = selectedText.match(hashtagRegex);

        if (selectedhashTagsMatch) {
          e.preventDefault();

          textarea.setRangeText("", cursorPosition, selectionEnd, "select");
          console.log(
            "Removed hashTags in select:",
            selectedhashTagsMatch[0].slice(1)
          );
        }
      }
    }

    if (!pos) return;
    switch (e.code) {
      case "ArrowUp":
        e.preventDefault();
        const nextIndex = index <= 0 ? filteredHashtags.length - 1 : index - 1;
        setIndex(nextIndex);
        console.log("ArrowUp:", nextIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        const prevIndex = index >= filteredHashtags.length - 1 ? 0 : index + 1;
        setIndex(prevIndex);
        break;
      case "Enter":
        e.preventDefault();
        complete(index, index === -1 ? name : undefined);
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

  const hashtagSelectionChangeFn = (caretPos: CaretPosition) => {
    if (
      caretPos.focused &&
      HASHTAG_REG.test(value?.slice(0, caretPos.selectionStart) || "")
    ) {
      setPos({
        top: caretPos.height * 4 /* FIXME */,
        left: caretPos.left - caretPos.top * 1.30 /* FIXME */,
        caret: caretPos.selectionStart,
      });
      filteredHashtags.length > 0 ? setIndex(0) : setIndex(-1);
    } else {
      setPos(null);
      filteredHashtags.length > 0 ? setIndex(0) : setIndex(-1);
    }
  };

  return {
    hashtagRegex,
    hashtagKeyDownFn,
    hashtagSelectionChangeFn,
    hashtagListProps: {
      name: name,
      chars: filteredHashtags,
      index,
      complete,
      top: pos?.top,
      left: pos?.left,
    },
  };
}

export default HashTagList;
export { useHashTagList };
