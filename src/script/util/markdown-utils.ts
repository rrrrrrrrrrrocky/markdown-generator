import { marked, RendererObject } from "marked";
import Prism from "prismjs";

// import loadLanguages from "prismjs/components";
import DOMPurify from "dompurify";

// loadLanguages(["bash", "sql"]);

const commonMarkedSettings = () => {
  // supported-languages: https://prismjs.com/#supported-languages

  console.log("loadLanguages >>", Prism.languages);
  const renderer: RendererObject = {
    code({ text, lang }) {
      const language = lang || "";
      try {
        if (Prism.languages[language]) {
          return `<pre class="language-${language}"><code class="language-${language}">${Prism.highlight(text, Prism.languages[language], language)}</code></pre>`;
        } else {
          // Handle unsupported language gracefully
          console.warn(`Unsupported language: ${language}`);
          return `<pre><code>${text}</code></pre>`; // Basic code display
        }
      } catch (err) {
        console.error(`Error highlighting code: ${err}`);
        return false; // Or handle the error differently
      }
    },
  };

  marked.use({ renderer });

  return marked;
};

export const markedClientParse = (value: string) => {
  commonMarkedSettings();

  const htmlString = marked.parse(value);

  return DOMPurify.sanitize(htmlString as string);
};
