import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { memo } from "react";
import reactReplace from "react-string-replace";

interface PostContentProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function PostContent({ content, className, ...rest }: PostContentProps) {
  // For Bold Text (**text**)
  let parsedContent = reactReplace(content, /\*\*(.*?)\*\*/g, (match, i) => (
    <strong key={i}>{match}</strong>
  ));

  // For Italic Text (*text*)
  parsedContent = reactReplace(parsedContent, /\*(.*?)\*/g, (match, i) => (
    <em key={i}>{match}</em>
  ));

  // For Inline Code (`code`)
  parsedContent = reactReplace(parsedContent, /`(.*?)`/g, (match, i) => (
    <code key={i}>{match}</code>
  ));

  // For Strikethrough Text (~~text~~)
  parsedContent = reactReplace(parsedContent, /~~(.*?)~~/g, (match, i) => (
    <del className="" key={i}>
      {match}
    </del>
  ));

  // For Spoiler Text (||text||)
  parsedContent = reactReplace(parsedContent, /\|\|(.*?)\|\|/g, (match, i) => (
    <details data-prevent-nprogress className="spoiler">
      <summary>{match}</summary>
    </details>
  ));

  // For Underline Text (__text__)
  parsedContent = reactReplace(parsedContent, /_(.*?)_/g, (match, i) => (
    <u key={i}>{match}</u>
  ));

  // For Mention (@username)
  parsedContent = reactReplace(parsedContent, /@(\w+)/g, (match, i) => (
    <Link
      key={i}
      className="px-0.5 bg-muted border rounded text-muted-foreground font-bold"
      href={`/users/${match}`}
    >
      @{match}
    </Link>
  ));

  // For Hashtag (#hashtag)
  parsedContent = reactReplace(parsedContent, /#(\w+)/g, (match, i) => (
    <Link
      key={i}
      className="text-blue-500 hover:underline"
      href={`/explore/tags/${match}`}
    >
      {match}
    </Link>
  ));

  return (
    <div
      {...rest}
      onClick={(e) => e.stopPropagation()}
      className={cn("text-[15px]", className)}
    >
      {parsedContent}
    </div>
  );
}

export default memo(PostContent);
