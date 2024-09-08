import { useEffect, useRef, useState } from "react";
import "./textarea-editor.css";

const TextareaEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  function getCursorPosition() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    // const selection = window.getSelection();
    // const range = selection.getRangeAt(0);

    // const cursorPos = textarea.selectionStart;

    // const textBeforeCursor = textarea.value.substring(0, cursorPos);
    // const textAfterCursor = textarea.value.substring(cursorPos);

    // const pre = document.createTextNode(textBeforeCursor);
    // const post = document.createTextNode(textAfterCursor);
    // const caretEle = document.createElement("span");
    // caretEle.innerHTML = "&nbsp;";

    // // mirroredEle.innerHTML = "";
    // // mirroredEle.append(pre, caretEle, post);

    // const rect = caretEle.getBoundingClientRect();

    // console.log("rect >>", rect);
    // // coordinatesButton.innerHTML = `Coordinates: (${rect.left}, ${rect.top})`;

    // let line = 1;
    // let offset = range.startOffset;

    // let node = range.startContainer;
    // console.log("node >>", node);
    // console.log("offset >>", offset);
    // while (node && node !== textarea) {
    //   if (node.nodeType === Node.TEXT_NODE) {
    //     const text = node.data;
    //     const lines = text.split("\\n");

    //     // 시작 노드 처리
    //     if (node === range.startContainer) {
    //       offset = range.startOffset;
    //       line += lines.length - 1;
    //     } else {
    //       line += lines.length;
    //     }

    //     // 끝 노드 처리
    //     if (node === range.endContainer) {
    //       break;
    //     }

    //     offset = 0;
    //   }

    //   node = node.parentNode;
    // }
    // console.log({ line, offset });

    const containerEle = document.getElementById("container");
    // const textarea = document.getElementById("textarea");

    const mirroredEle = document.createElement("div");
    mirroredEle.textContent = textarea.value;
    mirroredEle.classList.add("container__mirror");
    containerEle.prepend(mirroredEle);

    const textareaStyles = window.getComputedStyle(textarea);
    [
      "border",
      "boxSizing",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "letterSpacing",
      "lineHeight",
      "padding",
      "textDecoration",
      "textIndent",
      "textTransform",
      "whiteSpace",
      "wordSpacing",
      "wordWrap",
    ].forEach((property) => {
      mirroredEle.style[property] = textareaStyles[property];
    });
    mirroredEle.style.borderColor = "transparent";

    const parseValue = (v) =>
      v.endsWith("px") ? parseInt(v.slice(0, -2), 10) : 0;
    const borderWidth = parseValue(textareaStyles.borderWidth);

    const ro = new ResizeObserver(() => {
      mirroredEle.style.width = `${textarea.clientWidth + 2 * borderWidth}px`;
      mirroredEle.style.height = `${textarea.clientHeight + 2 * borderWidth}px`;
    });
    ro.observe(textarea);

    textarea.addEventListener("scroll", () => {
      mirroredEle.scrollTop = textarea.scrollTop;
    });

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const textAfterCursor = textarea.value.substring(cursorPos);

    const pre = document.createTextNode(textBeforeCursor);
    const post = document.createTextNode(textAfterCursor);
    const caretEle = document.createElement("span");
    caretEle.innerHTML = "&nbsp;";

    mirroredEle.innerHTML = "";
    mirroredEle.append(pre, caretEle, post);

    const rect = caretEle.getBoundingClientRect();

    console.log("rect >>", rect);

    // const coordinatesButton = document.getElementById("coordinates-button");
    // coordinatesButton.addEventListener("click", () => {
    //   const cursorPos = textarea.selectionStart;
    //   const textBeforeCursor = textarea.value.substring(0, cursorPos);
    //   const textAfterCursor = textarea.value.substring(cursorPos);

    //   const pre = document.createTextNode(textBeforeCursor);
    //   const post = document.createTextNode(textAfterCursor);
    //   const caretEle = document.createElement("span");
    //   caretEle.innerHTML = "&nbsp;";

    //   mirroredEle.innerHTML = "";
    //   mirroredEle.append(pre, caretEle, post);

    //   const rect = caretEle.getBoundingClientRect();
    //   coordinatesButton.innerHTML = `Coordinates: (${rect.left}, ${rect.top})`;

    //   console.log("rect >>", rect);
    // });

    // return { line, offset };
  }

  const [cursor, setCursor] = useState({
    start: {
      offset: 1,
      line: 1,
    },
    end: {
      offset: 1,
      line: 1,
    },
  });

  useEffect(() => {
    console.log("cursor >>", cursor);
  }, [cursor]);

  return (
    <div
      id="container"
      className="container"
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      {/* <p>{JSON.stringify(value)}</p> */}
      <p>{JSON.stringify(cursor)}</p>
      <button
        type="button"
        onClick={() => {
          console.log("cursor >>", cursor);
        }}>
        check
      </button>
      <textarea
        className="container__textarea"
        ref={textareaRef}
        // value={value}
        onChange={(e) => {
          // setValue()
          // getCursorPosition();
        }}
        onKeyDown={(e) => {
          console.log("e.key >>", e.key);
          console.log("e.key >>", textareaRef.current?.value);

          const value = textareaRef.current?.value || "";
          const jsonValue = JSON.stringify(value);
          const formattedValue = jsonValue.slice(1, jsonValue.length - 1);
          console.log("JsonValue>>", jsonValue);

          const lines = formattedValue.split("\\n");
          console.log("formattedValue >>", formattedValue);
          console.log("lines >>", lines);

          switch (e.key) {
            case "ArrowUp": {
              setCursor((prev) => {
                if (prev.start.line === 1) {
                  return prev;
                }

                return {
                  end: {
                    line: prev.start.line - 1,
                    offset: prev.end.offset,
                  },
                  start: {
                    line: prev.start.line - 1,
                    offset: prev.end.offset,
                  },
                };
              });
              break;
            }
            case "ArrowDown": {
              setCursor((prev) => {
                if (prev.start.line === lines.length) {
                  return prev;
                }

                return {
                  end: {
                    line: prev.start.line + 1,
                    offset: prev.end.offset,
                  },
                  start: {
                    line: prev.start.line + 1,
                    offset: prev.end.offset,
                  },
                };
              });
              break;
            }
            case "ArrowLeft": {
              setCursor((prev) => {
                if (prev.start.line === lines.length) {
                  return prev;
                }

                return {
                  end: {
                    line: prev.start.line + 1,
                    offset: prev.end.offset,
                  },
                  start: {
                    line: prev.start.line + 1,
                    offset: prev.end.offset,
                  },
                };
              });
              break;
            }
          }

          if (e.key === "Enter") {
            setCursor((prev) => {
              return {
                end: {
                  line: prev.start.line + 1,
                  offset: prev.end.offset,
                },
                start: {
                  line: prev.start.line + 1,
                  offset: prev.end.offset,
                },
              };
            });
          }
        }}
        style={{
          height: "100%",
          border: "1px solid gray",
          padding: "8px",
        }}
      />
    </div>
  );
};

export default TextareaEditor;
