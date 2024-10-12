import { ChangeEventHandler, useRef, useState } from "react";

import SimpleMarkdownEditor from "../_common/simple-markdown-editor/simple-markdown-editor";
import SimpleMarkdownPreview from "../_common/simple-markdown-editor/simple-markdown-preview";

const HomeContainer = () => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState("");
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="container flex h-screen w-full items-center justify-center gap-4 py-20">
      <SimpleMarkdownEditor
        className="size-full"
        ref={editorRef}
        value={value}
        onChange={onChange}
      />
      <SimpleMarkdownPreview
        className="size-full rounded-sm border border-slate-400 px-3 py-2"
        htmlString={value}
      />
    </div>
  );
};

export default HomeContainer;
