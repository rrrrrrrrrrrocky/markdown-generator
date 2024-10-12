"use client";

import "./github-markdown-css/light.css"; // GitHub 스타일 적용
import "./highlight/github.min.css";

import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

import { markdownToHtml } from "@/script/util/markdown-utils";
import { cn } from "@/script/util/ui-utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  htmlString: string;
}

const SimpleMarkdownPreview = forwardRef<HTMLDivElement, Props>(
  ({ htmlString, className, ...props }, ref) => {
    const [html, setHtml] = useState("");

    const getHtml = async () => {
      const markdownToHtmlString = await markdownToHtml(htmlString || "");
      setHtml(markdownToHtmlString);
    };

    useEffect(() => {
      getHtml();
    }, [htmlString]);

    return (
      <div
        ref={ref}
        className={cn("markdown-body", className)}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    );
  }
);

export default SimpleMarkdownPreview;
