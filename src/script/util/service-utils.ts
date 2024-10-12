// export const getCaretCoordinates = (fromStart = true) => {
//   let x, y;
//   const isSupported = typeof window.getSelection !== "undefined";
//   if (isSupported) {
//     const selection = window.getSelection();
//     if (selection.rangeCount !== 0) {
//       const range = selection.getRangeAt(0).cloneRange();
//       range.collapse(fromStart ? true : false);
//       const rect = range.getClientRects()[0];
//       if (rect) {
//         x = rect.left;
//         y = rect.top;
//       }
//     }
//   }
//   return { x, y };
// };

// export const getOnlyBlocks = (contents) => {
//   const result = contents.filter((elements) => elements.flag === 1);
//   return result;
// };

// export const getSelection = (element) => {
//   let selectionStart, selectionEnd;
//   const isSupported = typeof window.getSelection === "function";
//   // const isSupported = typeof window.getSelection !== "undefined";
//   if (isSupported) {
//     // console.log(window.getSelection());
//     const range = window.getSelection()?.getRangeAt(0);
//     const preSelectionRange = range.cloneRange();
//     preSelectionRange.selectNodeContents(element);
//     preSelectionRange.setEnd(range.startContainer, range.startOffset);
//     selectionStart = preSelectionRange.toString().length;
//     selectionEnd = selectionStart + range.toString().length;
//   }
//   return { selectionStart, selectionEnd };
// };

// export function parseBlocks(blocks, flag) {
//   if (flag) {
//     // make block
//     const { html } = blocks;

//     // console.log(html);
//     const newString = html
//       // .replace(/<[div][^>]*>/g, '<div>')
//       .replace(/&nbsp;/g, " ")
//       .replace(/<[^>]*>/g, "")
//       .replace(/&lt;/gi, "<")
//       .replace(/&gt;/gi, ">");

//     // console.log(newString);
//     return newString;
//   } else {
//     // copy
//     let newArr = blocks.map(({ html }) => {
//       const temp = html
//         .replace(/<div>/gi, "\n")
//         .replace(/&nbsp;/gi, " ")
//         .replace(/<[^>]*>/g, "");
//       return temp;
//     });
//     const parsedString = newArr.join("\n\n");
//     return parsedString;
//   }
// }

// export const setCaretToEnd = (element) => {
//   const range = document.createRange();
//   const selection = window.getSelection();
//   range.selectNodeContents(element);
//   range.collapse(false);
//   selection.removeAllRanges();
//   selection.addRange(range);
//   element.focus();
// };

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
