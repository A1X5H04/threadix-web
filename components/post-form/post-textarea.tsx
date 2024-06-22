import { useRef } from "react";
import {
  RichTextarea,
  RichTextareaHandle,
  RichTextareaProps,
} from "rich-textarea";
import { Mention } from "../rich-textarea/user-mention";

function PostTextArea(props: RichTextareaProps) {
  const textAreaRef = useRef<RichTextareaHandle>(null);
  return <Mention />;
}

export default PostTextArea;
