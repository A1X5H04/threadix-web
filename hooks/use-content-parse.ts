import { forwardRef } from "react";
import reactStringReplace from "react-string";

interface ParseProps {
  text: string;
  type:
    | "bold"
    | "italic"
    | "strikethrough"
    | "link"
    | "code"
    | "spoiler"
    | "mention"
    | "hashtag";
  component: (matcherText: string, index: number) => JSX.Element;
}

export function useParse({ text, type, component }: ParseProps) {
  const markdownRegex = {
    bold: /\*\*(.*?)\*\*|__(.*?)__/g,
    italic: /\*(.*?)\*|_(.*?)_/g,
    strikethrough: /~~(.*?)~~/g,
    link: /\[([^\]]+)\]\(([^)]+)\)/g,
    code: /`([^`]+)`/g,
    spoiler: /\|\|(.*?)\|\|/g,
    mention: /@(\w+)/g,
    hashtag: /#(\w+)/g,
  };

  switch (type) {
    case "bold":
      return reactStringReplace(
        text,
        markdownRegex.bold,
        (match: string, i: number) => {
          return component(match, i);
        }
      );
    case "italic":
      return reactStringReplace(
        text,
        markdownRegex.italic,
        (match: string, i: number) => {
          return component(match, i);
        }
      );
    case "strikethrough":
      return reactStringReplace(
        text,
        markdownRegex.strikethrough,
        (match: string, i: number) => {
          return component(match, i);
        }
      );
    case "link":
      return reactStringReplace(
        text,
        markdownRegex.link,
        (match: string, i: number) => {
          return component(match, i);
        }
      );
    case "code":
      return reactStringReplace(
        text,
        markdownRegex.code,
        (match: string, i: number) => component(match, i)
      );
    case "spoiler":
      return reactStringReplace(
        text,
        markdownRegex.spoiler,
        (match: string, i: number) => component(match, i)
      );
    case "mention":
      return reactStringReplace(
        text,
        markdownRegex.mention,
        (match: string, i: number) => component(match, i)
      );
    case "hashtag":
      return reactStringReplace(
        text,
        markdownRegex.hashtag,
        (match: string, i: number) => component(match, i)
      );
  }
}
