// import "@/component/_common/simple-markdown-editor/highlight/github.min.css";
// import "@/component/_common/simple-markdown-editor/github-markdown-css/light.css";

import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import breaks from "remark-breaks";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";

// import hljs from "@/component/_common/simple-markdown-editor/highlight/highlight.js";

export const markdownToHtml = async (value: string) => {
  const processor = remark()
    .data("settings", {
      allowDangerousHtml: true,
    })
    .use(markdown)
    .use(breaks)
    .use(remarkGfm, {})
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(remarkFrontmatter)
    .use(rehypeHighlight) // 코드 하이라이트 적용
    .use(rehypeStringify);

  const file = await processor.process(value);

  return file.toString();
};
