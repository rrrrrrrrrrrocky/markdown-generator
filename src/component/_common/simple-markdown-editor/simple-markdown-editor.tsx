"use client";

import {
  forwardRef,
  KeyboardEventHandler,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

import { Textarea } from "@/component/ui/textarea";

const isMac = () => /Mac/.test(navigator.userAgent);
const isWindows = () => /Win/.test(navigator.userAgent);

const SimpleMarkdownEditor = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const { key, shiftKey, metaKey, ctrlKey } = event;
    const textarea = textareaRef.current!;
    const { selectionStart, selectionEnd, value } = textarea;
    if (key === "Tab") {
      event.preventDefault();
      const currentLineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
      const currentLine = value.slice(currentLineStart, selectionEnd);

      if (shiftKey) {
        // Shift + Tab: Remove 2 spaces if they exist at the start of the line
        if (currentLine.startsWith("  ")) {
          textarea.value =
            value.slice(0, currentLineStart) +
            currentLine.slice(2) +
            value.slice(selectionEnd);
          textarea.selectionStart = selectionStart - 2;
          textarea.selectionEnd = selectionEnd - 2;
        }
      } else {
        // Tab: Add 2 spaces at the start of the line
        textarea.value = `${value.slice(0, currentLineStart)}${"  "}${
          currentLine
        }${value.slice(selectionEnd)}`;
        textarea.selectionStart = selectionStart + 2;
        textarea.selectionEnd = selectionEnd + 2;
      }
    }

    if (key === "/" && selectionStart === selectionEnd) {
      const currentLineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
      if (selectionStart === currentLineStart) {
        // Show command menu (For demonstration, log message to console)
        console.log("Show command menu");
      }
    }

    if (
      (isMac() && metaKey && key === "b") ||
      (isWindows() && ctrlKey && key === "b")
    ) {
      event.preventDefault();
      if (selectionStart !== selectionEnd) {
        // Wrap the selected text with ** **
        const selectedText = value.slice(selectionStart, selectionEnd);
        const newValue = `${value.slice(
          0,
          selectionStart
        )}**${selectedText}**${value.slice(selectionEnd)}`;
        textarea.value = newValue;
        textarea.selectionStart = selectionStart;
        textarea.selectionEnd = selectionEnd + 4;
      }
    }

    if (
      (isMac() && metaKey && key === "i") ||
      (isWindows() && ctrlKey && key === "i")
    ) {
      event.preventDefault();
      if (selectionStart !== selectionEnd) {
        // Wrap the selected text with ~~ ~~
        const selectedText = value.slice(selectionStart, selectionEnd);
        const newValue = `${value.slice(
          0,
          selectionStart
        )}~~${selectedText}~~${value.slice(selectionEnd)}`;
        textarea.value = newValue;
        textarea.selectionStart = selectionStart;
        textarea.selectionEnd = selectionEnd + 4;
      }
    }
  };

  return <Textarea ref={textareaRef} onKeyDown={handleKeyDown} {...props} />;
  // return <textarea ref={textareaRef} onKeyDown={handleKeyDown} {...props} />;
});

export default SimpleMarkdownEditor;
