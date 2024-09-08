import { AppShellSection } from "@mantine/core";
import {
  createElement,
  FormEventHandler,
  MouseEventHandler,
  useId,
  useRef,
  useState,
} from "react";

// const EditableDiv = React.forwardRef<HTMLDivElement, EditableDivProps>(
//   ({ className, ...props }: EditableDivProps, ref) => {
//     return (
//       <div
//         className={cn(
//           'flex min-h-[80px] w-full rounded-md border ...생략',
//           className,
//         )}
//         {...props}
//         ref={ref}
//         contentEditable={true}
//         data-ph={props.placeholder}
//       >
//         {props.children}
//       </div>
//     );
//   },
// );

{
  /* <EditableDiv
  placeholder={`설명을 입력하세요 (${MAX_CONTENT_LENGTH}자 이내)`}
  className="h-full"
  ref={contentRef}
  >
  {data ? data.content : ''}
</EditableDiv> */
}

const MarkdownEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [block, setBlock] = useState([
    {
      line: 1,
      html: "",
      tag: "div",
      flag: 0,
      inlineBlocks: undefined,
      previousKey: null,
      actionMenuOpen: false,
      actionMenuPosition: { x: null, y: null },
      selectionStart: 0,
      selectionEnd: 0,
    },
  ]);
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
  // console.log("cursor >>", cursor);

  const onCursor = (
    el: HTMLDivElement | null
  ): { start: number; end: number } | undefined => {
    if (!el) return;
    const selection = window.getSelection && window.getSelection();
    console.log("selection >>", selection);

    const range = selection?.getRangeAt(0);
    console.log("selection?.getRangeAt(0) >>", selection?.getRangeAt(0));

    const start = range?.startOffset || 1;
    const end = range?.endOffset || 1;

    const clientRects = range?.getClientRects();
    console.log("clientRects >>", clientRects);
    // setCursor({ start, end });

    return { start, end, clientRects, isCollapsed: selection?.isCollapsed };
  };

  const onInput: FormEventHandler<HTMLDivElement> = (e) => {
    const { start, end } = onCursor(divRef.current);

    setCursor({
      start: {
        line: 1,
        offset: start,
      },
      end: {
        line: 1,
        offset: end,
      },
    });
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    const { start, end } = onCursor(divRef.current);

    console.log("mouse up >>", { start, end });
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current?.textContent) return;
    const { start, end } = onCursor(divRef.current);

    console.log("mouse down >>", { start, end });
  };

  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <p>{JSON.stringify(value)}</p>
      <div
        suppressContentEditableWarning
        ref={divRef}
        contentEditable
        // content={value}
        onInput={onInput}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        style={{
          height: "100%",
          border: "1px solid gray",
          padding: "8px",
        }}
        // content={ block}
        onKeyDown={(e) => {
          if (!divRef.current) return;
          if (e.key === "Up") {
            setCursor((prev) => {
              const isFirstLine = prev.start.line === 1;
              return {
                start: {
                  line: isFirstLine ? 1 : prev.start.line - 1,
                  offset:
                    prev.start.offset >
                    (divRef.current?.textContent?.length || 0)
                      ? divRef.current?.textContent
                      : prev.start.offset,
                },
                end: {
                  line: isFirstLine ? 1 : prev.start.line - 1,
                  offset:
                    prev.start.offset >
                    (divRef.current?.textContent?.length || 0)
                      ? divRef.current?.textContent
                      : prev.start.offset,
                },
              };
            });
          }
          // if (e.key === "Enter") {
          //   setBlock((prev) => {
          //     // const selectedLine = prev.find((data)=> data.line === cu)
          //     return [
          //       ...prev,
          //       {
          //         // line: prev.line + 1,
          //         html: "",
          //         tag: "div",
          //         flag: 0,
          //         previousKey: null,
          //         actionMenuOpen: false,
          //         actionMenuPosition: { x: null, y: null },
          //         selectionStart: 0,
          //         selectionEnd: 0,
          //       },
          //     ];
          //   });
          // }
          if (e.key === "Shift-Tab") {
            e.preventDefault(); // 기본 동작 방지
            console.log("shift tab");
          }
          // if(e.)
          if (e.key === "Tab") {
            e.preventDefault(); // 기본 동작 방지
            console.log("divRef >>", divRef.current?.childNodes);
            // const textarea = divRef.current;
            // const start = textarea.selectionStart;
            // const end = textarea.selectionEnd;

            // const JsonValue = JSON.stringify(value);
            // // const JsonValue = JSON.stringify(value);

            // console.log(value.split("\\n"));
            // console.log(JSON.parse(JsonValue));

            // // 현재 줄의 시작 인덱스 찾기
            // const lineStart = value.lastIndexOf(" ", start) + 1;
            // // const lineStart = JsonValue.lastIndexOf("\\n", start) + 1;

            // console.log("lineStart >>", lineStart);

            // // 새로운 값 생성
            // const newValue =
            //   value.substring(0, lineStart) +
            //   "  " + // 맨 앞에 스페이스 2칸 추가
            //   value.substring(lineStart, start) +
            //   value.substring(end);

            // setValue(newValue);
            // // setValue(JSON.parse(newValue));

            // // textarea.value = newValue;
            // textarea.selectionStart = lineStart + 2;
            // textarea.selectionEnd = lineStart + 2;
          }
        }}>
        {/* <p
          style={{
            background: "red",
          }}>
          asdasd
        </p> */}
        {/* {value} */}
        {block.map(({ tag, inlineBlocks }) => {
          return createElement(tag, {
            key: useId(),
            children: inlineBlocks && inlineBlocks,
          });
          // return tag;
        })}
      </div>
      {/* <textarea
        style={{
          height: "100%",
        }}
        ref={textareaRef}
        onKeyDown={(e) => {
          if (!textareaRef.current) return;
          if (e.key === "Shift-Tab") {
            e.preventDefault(); // 기본 동작 방지
            console.log("shift tab");
          }
          if (e.key === "Tab") {
            e.preventDefault(); // 기본 동작 방지

            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const JsonValue = JSON.stringify(value);
            // const JsonValue = JSON.stringify(value);

            console.log(value.split("\\n"));
            console.log(JSON.parse(JsonValue));

            // 현재 줄의 시작 인덱스 찾기
            const lineStart = value.lastIndexOf(" ", start) + 1;
            // const lineStart = JsonValue.lastIndexOf("\\n", start) + 1;

            console.log("lineStart >>", lineStart);

            // 새로운 값 생성
            const newValue =
              value.substring(0, lineStart) +
              "  " + // 맨 앞에 스페이스 2칸 추가
              value.substring(lineStart, start) +
              value.substring(end);

            setValue(newValue);
            // setValue(JSON.parse(newValue));

            // textarea.value = newValue;
            textarea.selectionStart = lineStart + 2;
            textarea.selectionEnd = lineStart + 2;
          }
        }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      /> */}
    </div>
  );
};

export default MarkdownEditor;

// const os = require('os');

// if (os.platform() === 'darwin') {
//   console.log('This is a Mac.');
// }
const isMac = /Mac/.test(navigator.userAgent);

const isMobile = function () {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

// var bindings = {
//   toggleBold: toggleBold,
//   toggleItalic: toggleItalic,
//   drawLink: drawLink,
//   toggleHeadingSmaller: toggleHeadingSmaller,
//   toggleHeadingBigger: toggleHeadingBigger,
//   drawImage: drawImage,
//   toggleBlockquote: toggleBlockquote,
//   toggleOrderedList: toggleOrderedList,
//   toggleUnorderedList: toggleUnorderedList,
//   toggleCodeBlock: toggleCodeBlock,
//   togglePreview: togglePreview,
//   toggleStrikethrough: toggleStrikethrough,
//   toggleHeading1: toggleHeading1,
//   toggleHeading2: toggleHeading2,
//   toggleHeading3: toggleHeading3,
//   cleanBlock: cleanBlock,
//   drawTable: drawTable,
//   drawHorizontalRule: drawHorizontalRule,
//   undo: undo,
//   redo: redo,
//   toggleSideBySide: toggleSideBySide,
//   toggleFullScreen: toggleFullScreen,
// };

// const bindings = {
//   toggleBold:
// }

// let shortcuts = {
//   toggleBold: "Cmd-B",
//   toggleItalic: "Cmd-I",
//   drawLink: "Cmd-K",
//   toggleHeadingSmaller: "Cmd-H",
//   toggleHeadingBigger: "Shift-Cmd-H",
//   cleanBlock: "Cmd-E",
//   drawImage: "Cmd-Alt-I",
//   toggleBlockquote: "Cmd-'",
//   toggleOrderedList: "Cmd-Alt-L",
//   toggleUnorderedList: "Cmd-L",
//   toggleCodeBlock: "Cmd-Alt-C",
//   togglePreview: "Cmd-P",
//   toggleSideBySide: "F9",
//   toggleFullScreen: "F11",
// };

// function getState(cm, pos) {
//   pos = pos || cm.getCursor("start");
//   var stat = cm.getTokenAt(pos);
//   if (!stat.type) return {};

//   var types = stat.type.split(" ");

//   var ret = {},
//     data,
//     text;
//   for (var i = 0; i < types.length; i++) {
//     data = types[i];
//     if (data === "strong") {
//       ret.bold = true;
//     } else if (data === "variable-2") {
//       text = cm.getLine(pos.line);
//       if (/^\s*\d+\.\s/.test(text)) {
//         ret["ordered-list"] = true;
//       } else {
//         ret["unordered-list"] = true;
//       }
//     } else if (data === "atom") {
//       ret.quote = true;
//     } else if (data === "em") {
//       ret.italic = true;
//     } else if (data === "quote") {
//       ret.quote = true;
//     } else if (data === "strikethrough") {
//       ret.strikethrough = true;
//     } else if (data === "comment") {
//       ret.code = true;
//     } else if (data === "link") {
//       ret.link = true;
//     } else if (data === "tag") {
//       ret.image = true;
//     } else if (data.match(/^header(\-[1-6])?$/)) {
//       ret[data.replace("header", "heading")] = true;
//     }
//   }
//   return ret;
// }

// function _toggleHeading(cm, direction, size) {
//   if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
//     return;

//   var startPoint = cm.getCursor("start");
//   var endPoint = cm.getCursor("end");
//   for (var i = startPoint.line; i <= endPoint.line; i++) {
//     (function (i) {
//       var text = cm.getLine(i);
//       var currHeadingLevel = text.search(/[^#]/);

//       if (direction !== undefined) {
//         if (currHeadingLevel <= 0) {
//           if (direction == "bigger") {
//             text = "###### " + text;
//           } else {
//             text = "# " + text;
//           }
//         } else if (currHeadingLevel == 6 && direction == "smaller") {
//           text = text.substr(7);
//         } else if (currHeadingLevel == 1 && direction == "bigger") {
//           text = text.substr(2);
//         } else {
//           if (direction == "bigger") {
//             text = text.substr(1);
//           } else {
//             text = "#" + text;
//           }
//         }
//       } else {
//         if (size == 1) {
//           if (currHeadingLevel <= 0) {
//             text = "# " + text;
//           } else if (currHeadingLevel == size) {
//             text = text.substr(currHeadingLevel + 1);
//           } else {
//             text = "# " + text.substr(currHeadingLevel + 1);
//           }
//         } else if (size == 2) {
//           if (currHeadingLevel <= 0) {
//             text = "## " + text;
//           } else if (currHeadingLevel == size) {
//             text = text.substr(currHeadingLevel + 1);
//           } else {
//             text = "## " + text.substr(currHeadingLevel + 1);
//           }
//         } else {
//           if (currHeadingLevel <= 0) {
//             text = "### " + text;
//           } else if (currHeadingLevel == size) {
//             text = text.substr(currHeadingLevel + 1);
//           } else {
//             text = "### " + text.substr(currHeadingLevel + 1);
//           }
//         }
//       }

//       cm.replaceRange(
//         text,
//         {
//           line: i,
//           ch: 0,
//         },
//         {
//           line: i,
//           ch: 99999999999999,
//         }
//       );
//     })(i);
//   }
//   cm.focus();
// }

// function _toggleBlock(editor, type, start_chars, end_chars) {
//   // if (
//   //   /editor-preview-active/.test(
//   //     editor.codemirror.getWrapperElement().lastChild.className
//   //   )
//   // ) {
//   //   return;
//   // }

//   end_chars = typeof end_chars === "undefined" ? start_chars : end_chars;
//   var cm = editor.codemirror;
//   var stat = getState(cm);

//   var text;
//   var start = start_chars;
//   var end = end_chars;

//   var startPoint = cm.getCursor("start");
//   var endPoint = cm.getCursor("end");

//   if (stat[type]) {
//     text = cm.getLine(startPoint.line);
//     start = text.slice(0, startPoint.ch);
//     end = text.slice(startPoint.ch);
//     if (type == "bold") {
//       start = start.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "");
//       end = end.replace(/(\*\*|__)/, "");
//     } else if (type == "italic") {
//       start = start.replace(/(\*|_)(?![\s\S]*(\*|_))/, "");
//       end = end.replace(/(\*|_)/, "");
//     } else if (type == "strikethrough") {
//       start = start.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "");
//       end = end.replace(/(\*\*|~~)/, "");
//     }
//     cm.replaceRange(
//       start + end,
//       {
//         line: startPoint.line,
//         ch: 0,
//       },
//       {
//         line: startPoint.line,
//         ch: 99999999999999,
//       }
//     );

//     if (type == "bold" || type == "strikethrough") {
//       startPoint.ch -= 2;
//       if (startPoint !== endPoint) {
//         endPoint.ch -= 2;
//       }
//     } else if (type == "italic") {
//       startPoint.ch -= 1;
//       if (startPoint !== endPoint) {
//         endPoint.ch -= 1;
//       }
//     }
//   } else {
//     text = cm.getSelection();
//     if (type == "bold") {
//       text = text.split("**").join("");
//       text = text.split("__").join("");
//     } else if (type == "italic") {
//       text = text.split("*").join("");
//       text = text.split("_").join("");
//     } else if (type == "strikethrough") {
//       text = text.split("~~").join("");
//     }
//     cm.replaceSelection(start + text + end);

//     startPoint.ch += start_chars.length;
//     endPoint.ch = startPoint.ch + text.length;
//   }

//   cm.setSelection(startPoint, endPoint);
//   cm.focus();
// }

// const getBindingName = (f) => {
//   for (var key in bindings) {
//     if (bindings[key] === f) {
//       return key;
//     }
//   }
//   return null;
// };

// const fixShortcut = (name) =>{
//   if (isMac) {
//     name = name.replace("Ctrl", "Cmd");
//   } else {
//     name = name.replace("Cmd", "Ctrl");
//   }
//   return name;
// }

// function toggleBold(editor) {
//   _toggleBlock(editor, "bold", editor.options.blockStyles.bold);
// }

// var toolbarBuiltInButtons = {
//   bold: {
//     name: "bold",
//     action: toggleBold,
//     className: "fa fa-bold",
//     title: "Bold",
//     default: true,
//   },
// }

// function SimpleMDE(options) {
//   // Handle options parameter
//   options = options || {};

//   // Used later to refer to it"s parent
//   options.parent = this;

//   // Check if Font Awesome needs to be auto downloaded
//   var autoDownloadFA = true;

//   if (options.autoDownloadFontAwesome === false) {
//     autoDownloadFA = false;
//   }

//   if (options.autoDownloadFontAwesome !== true) {
//     var styleSheets = document.styleSheets;
//     for (var i = 0; i < styleSheets.length; i++) {
//       if (!styleSheets[i].href) continue;

//       if (
//         styleSheets[i].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") >
//         -1
//       ) {
//         autoDownloadFA = false;
//       }
//     }
//   }

//   if (autoDownloadFA) {
//     var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href =
//       "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css";
//     document.getElementsByTagName("head")[0].appendChild(link);
//   }

//   // Find the textarea to use
//   if (options.element) {
//     this.element = options.element;
//   } else if (options.element === null) {
//     // This means that the element option was specified, but no element was found
//     console.log("SimpleMDE: Error. No element was found.");
//     return;
//   }

//   // Handle toolbar
//   if (options.toolbar === undefined) {
//     // Initialize
//     options.toolbar = [];

//     // Loop over the built in buttons, to get the preferred order
//     for (var key in toolbarBuiltInButtons) {
//       if (toolbarBuiltInButtons.hasOwnProperty(key)) {
//         if (key.indexOf("separator-") != -1) {
//           options.toolbar.push("|");
//         }

//         if (
//           toolbarBuiltInButtons[key].default === true ||
//           (options.showIcons &&
//             options.showIcons.constructor === Array &&
//             options.showIcons.indexOf(key) != -1)
//         ) {
//           options.toolbar.push(key);
//         }
//       }
//     }
//   }

//   // Handle status bar
//   if (!options.hasOwnProperty("status")) {
//     options.status = ["autosave", "lines", "words", "cursor"];
//   }

//   // Add default preview rendering function
//   if (!options.previewRender) {
//     options.previewRender = function (plainText) {
//       // Note: "this" refers to the options object
//       return this.parent.markdown(plainText);
//     };
//   }

//   // Set default options for parsing config
//   options.parsingConfig = extend(
//     {
//       highlightFormatting: true, // needed for toggleCodeBlock to detect types of code
//     },
//     options.parsingConfig || {}
//   );

//   // Merging the insertTexts, with the given options
//   options.insertTexts = extend({}, insertTexts, options.insertTexts || {});

//   // Merging the promptTexts, with the given options
//   options.promptTexts = promptTexts;

//   // Merging the blockStyles, with the given options
//   options.blockStyles = extend({}, blockStyles, options.blockStyles || {});

//   // Merging the shortcuts, with the given options
//   options.shortcuts = extend({}, shortcuts, options.shortcuts || {});

//   // Change unique_id to uniqueId for backwards compatibility
//   if (
//     options.autosave != undefined &&
//     options.autosave.unique_id != undefined &&
//     options.autosave.unique_id != ""
//   )
//     options.autosave.uniqueId = options.autosave.unique_id;

//   // Update this options
//   this.options = options;

//   // Auto render
//   this.render();

//   // The codemirror component is only available after rendering
//   // so, the setter for the initialValue can only run after
//   // the element has been rendered
//   if (
//     options.initialValue &&
//     (!this.options.autosave || this.options.autosave.foundSavedValue !== true)
//   ) {
//     this.value(options.initialValue);
//   }
// }
