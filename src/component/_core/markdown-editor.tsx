import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  toolbarPlugin,
  KitchenSinkToolbar,
  markdownShortcutPlugin,
  SandpackConfig,
  MDXEditorProps,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import { forwardRef } from "react";
// import i18next from "i18next";
import styles from "./markdown-editor.module.css";

interface Props extends MDXEditorProps {
  markdown: string;
  onChange: (str: string) => void;
}

export const MarkdownEditor = forwardRef<MDXEditorMethods, Props>(
  ({ markdown, onChange, ...props }, ref) => {
    return (
      <MDXEditor
        ref={ref}
        placeholder="내용을 입력해주세요"
        contentEditableClassName={styles.editor}
        // TODO: i18n 발전 필요
        // translation={(key, defaultValue, interpolations) => {
        //   return i18next.t(key, defaultValue, interpolations) as string;
        // }}
        autoFocus
        markdown={markdown}
        onChange={(str) => {
          onChange(str);
        }}
        plugins={[
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin({
            // linkAutocompleteSuggestions: [
            //   "https://virtuoso.dev",
            //   "https://mdxeditor.dev",
            // ],
          }),
          imagePlugin({
            imageUploadHandler: (file) => {
              console.log("file >>", file);
              return new Promise((resolve) => {
                resolve(URL.createObjectURL(file));
              });
            },
            // imageAutocompleteSuggestions: [
            //   "https://picsum.photos/200/300",
            //   "https://picsum.photos/200",
            // ],
          }),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              txt: "text",
              tsx: "TypeScript",
              html: "HTML",
              shell: "Shell",
            },
          }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),

          toolbarPlugin({
            toolbarContents: () => <KitchenSinkToolbar />,
          }),
          markdownShortcutPlugin(),
        ]}
        {...props}
      />
    );
  }
);

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};
