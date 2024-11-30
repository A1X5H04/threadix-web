import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CaretPosition,
  RichTextarea,
  RichTextareaHandle,
  createRegexRenderer,
} from "rich-textarea";
import { Button } from "../ui/button";
import {
  RiBold,
  RiFontMono,
  RiItalic,
  RiSquareFill,
  RiStrikethrough,
  RiUnderline,
} from "@remixicon/react";

const boldReg = /\*\*([^*]+)\*\*/g;
const italicReg = /(?<!\*)\*([^*]+)\*(?!\*)/g;
const strikeReg = /~~([^~]+)~~/g;
const monoReg = /`([^`]+)`/g;
const underlineReg = /_([^_]+)_/g;
const spoilerReg = />!([^!]+)!</g;

// const richTextRenderer = createRegexRenderer([
//   [boldReg, { fontWeight: "bold" }],
//   [italicReg, { fontStyle: "italic" }],
//   [strikeReg, { textDecoration: "line-through" }],
//   [monoReg, { fontFamily: "monospace" }],
// ]);

enum FormatOptions {
  BOLD,
  ITALIC,
  STRIKE,
  MONO,
  UNDERLINE,
  SPOILER,
}

const ToolbarMenu = ({
  top,
  left,
  onOptionSelect,
}: {
  top: number;
  left: number;
  onOptionSelect: (option: FormatOptions) => void;
}) => {
  return (
    <div
      className="flex gap-x-1 p-1 fixed z-50 bg-background border rounded-lg shadow-md"
      style={{
        top: top,
        left: left,
      }}
    >
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.BOLD)}
      >
        <RiBold className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.ITALIC)}
      >
        <RiItalic className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.STRIKE)}
      >
        <RiStrikethrough className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.UNDERLINE)}
      >
        <RiUnderline className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.MONO)}
      >
        <RiFontMono className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:bg-muted text-muted-foreground rounded-md transition-colors"
        onMouseDown={() => onOptionSelect(FormatOptions.SPOILER)}
      >
        <RiSquareFill className="w-4 h-4" />
      </button>
    </div>
  );
};

interface UseToolbarMenuProps {
  toolbarSelectionFn: (pos: CaretPosition) => void;
  optionSelectionFn: (option: FormatOptions) => void;
  toolbarMenuProps: { top: number | undefined; left: number | undefined };
  isToolbarMenuVisible: boolean;
}

function useToolbarMenu(
  ref: React.RefObject<RichTextareaHandle>,
  value: string | undefined
): UseToolbarMenuProps {
  const [[selectionStart, selectionEnd, pos], setSelection] = useState<
    [number, number, { top: number; left: number } | undefined] | []
  >([]);
  const hideMenu =
    selectionStart == null ||
    selectionEnd == null ||
    selectionStart === selectionEnd;

  const optionSelectionFn = (option: FormatOptions) => {
    if (!ref.current || hideMenu) return;

    const selectedText = value?.slice(selectionStart, selectionEnd);
    if (!selectedText) return;

    switch (option) {
      case FormatOptions.BOLD:
        if (boldReg.test(selectedText)) {
          ref.current.setRangeText(
            selectedText.replace(boldReg, "$1"),
            selectionStart,
            selectionEnd
          );
        } else {
          ref.current.setRangeText(
            `**${value?.slice(selectionStart, selectionEnd)}**`,
            selectionStart,
            selectionEnd
          );
        }
        break;
      case FormatOptions.ITALIC:
        if (italicReg.test(selectedText)) {
          ref.current.setRangeText(
            selectedText.replace(italicReg, "$1"),
            selectionStart,
            selectionEnd
          );
        } else {
          ref.current.setRangeText(
            `*${value?.slice(selectionStart, selectionEnd)}*`,
            selectionStart,
            selectionEnd
          );
        }
        break;
      case FormatOptions.STRIKE:
        if (strikeReg.test(selectedText)) {
          ref.current.setRangeText(
            selectedText.replace(strikeReg, "$1"),
            selectionStart,
            selectionEnd
          );
        } else {
          ref.current.setRangeText(
            `~~${value?.slice(selectionStart, selectionEnd)}~~`,
            selectionStart,
            selectionEnd
          );
        }
        break;
      case FormatOptions.MONO:
        if (monoReg.test(selectedText)) {
          ref.current.setRangeText(
            selectedText.replace(monoReg, "$1"),
            selectionStart,
            selectionEnd
          );
        } else {
          ref.current.setRangeText(
            "`" + value?.slice(selectionStart, selectionEnd) + "`",
            selectionStart,
            selectionEnd
          );
        }
        break;
      case FormatOptions.UNDERLINE:
        if (underlineReg.test(selectedText)) {
          ref.current.setRangeText(
            selectedText.replace(underlineReg, "$1"),
            selectionStart,
            selectionEnd
          );
        } else {
          ref.current.setRangeText(
            `_${value?.slice(selectionStart, selectionEnd)}_`,
            selectionStart,
            selectionEnd
          );
        }
        break;
      case FormatOptions.SPOILER:
        ref.current.setRangeText(
          `||${value?.slice(selectionStart, selectionEnd)}||`,
          selectionStart,
          selectionEnd
        );
        break;
    }
  };

  const toolbarSelectionFn = (pos: CaretPosition) => {
    setSelection([
      pos.selectionStart,
      pos.selectionEnd,
      pos.focused
        ? {
            top: pos.height * 0.5 /* FIXME */,
            left: pos.left - pos.top * 1.45 /* FIXME */,
          }
        : undefined,
    ]);
  };

  const isToolbarMenuVisible = Boolean(pos && !hideMenu);

  return {
    toolbarSelectionFn,
    optionSelectionFn,
    isToolbarMenuVisible,
    toolbarMenuProps: {
      top: pos?.top,
      left: pos?.left,
    },
  };
}

export default ToolbarMenu;
export { useToolbarMenu };
