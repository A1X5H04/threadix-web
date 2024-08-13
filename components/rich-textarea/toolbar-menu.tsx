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

const style = { width: "400px", height: "300px" };

const boldReg = /\*\*([^\*]+)\*\*/g;
const italicReg = /\*([^\*]+)\*/g;
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
        position: "fixed",
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
  richTextRegex: {
    boldReg: RegExp;
    italicReg: RegExp;
    strikeReg: RegExp;
    monoReg: RegExp;
    underlineReg: RegExp;
    spoilerReg: RegExp;
  };
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
    switch (option) {
      case FormatOptions.BOLD:
        ref.current.setRangeText(
          `**${value?.slice(selectionStart, selectionEnd)}**`,
          selectionStart,
          selectionEnd
        );
        break;
      case FormatOptions.ITALIC:
        ref.current.setRangeText(
          `*${value?.slice(selectionStart, selectionEnd)}*`,
          selectionStart,
          selectionEnd
        );
        break;
      case FormatOptions.STRIKE:
        ref.current.setRangeText(
          `~~${value?.slice(selectionStart, selectionEnd)}~~`,
          selectionStart,
          selectionEnd
        );
        break;
      case FormatOptions.MONO:
        ref.current.setRangeText(
          "`" + value?.slice(selectionStart, selectionEnd) + "`",
          selectionStart,
          selectionEnd
        );
        break;
      case FormatOptions.UNDERLINE:
        ref.current.setRangeText(
          `_${value?.slice(selectionStart, selectionEnd)}_`,
          selectionStart,
          selectionEnd
        );
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
            top: pos.top - pos.height * 2.5 /* FIXME */,
            left: pos.left /* FIXME */,
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
    richTextRegex: {
      boldReg,
      italicReg,
      strikeReg,
      monoReg,
      underlineReg,
      spoilerReg,
    },
  };
}

export default ToolbarMenu;
export { useToolbarMenu };
