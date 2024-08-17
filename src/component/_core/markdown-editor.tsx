import "@mdxeditor/editor/style.css";
import "@/resource/styles/globals.css";
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
} from "@mdxeditor/editor";
import { useRef } from "react";
import i18next from "i18next";

const MarkdownEditor = () => {
  const ref = useRef<string>("");

  return (
    <MDXEditor
      // className={editorStyle}
      // contentEditableClassName=""
      // contentEditableClassName="editor-container"
      // className="dark-theme dark-editor"
      // className="h-full border border-black"
      // TODO: i18n 발전 필요
      translation={(key, defaultValue, interpolations) => {
        return i18next.t(key, defaultValue, interpolations) as string;
      }}
      autoFocus
      markdown={ref.current}
      onChange={(str) => {
        ref.current = str;
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
    />
  );
};

export default MarkdownEditor;

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
