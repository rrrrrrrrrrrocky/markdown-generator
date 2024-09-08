// // 텍스트를 검색하고 대치 하기 위해 현재 커서의 위치를 가져와야 한다.
// const cursorInfo = getCursorPosition(contentRef.current!);

// switch (e.key) {
//   case "@":
//     if (!showTitleList) {
//       // 처음 시작 위치를 기억한다.
//       currentLineRef.current = cursorInfo.currentLine;
//       atPositionRef.current = cursorInfo.position;
//     }
//     setShowTitleList(true);
//     return;
//   case "ArrowUp":
//   case "ArrowLeft":
//   case "ArrowDown":
//   case "ArrowRight":
//     return;
//   case "Enter":
//     if (showTitleList) {
//       e.preventDefault();
//       handleSelectTitle(selectedTitleIndex);
//     }
//     return;
// }

// /**
//  * 엔터, 클릭시 선택된 글을 에디터에 링크로 적용한다.
//  * @param index 검색된 wiki의 index
//  */
// const handleSelectTitle = (index: number) => {
//   const innerHTML = contentRef.current!.innerHTML ?? "";
//   const { saveRange, restoreRange } = manageRange();

//   saveRange();
//   const matchedWikiData = filteredTitleList[index];
//   contentRef.current!.innerHTML = innerHTML.replace(
//     `@${searchWordRef.current}`,
//     `<button id='link-${matchedWikiData.id}' class="text-blue-400 ml-0.5">${matchedWikiData.title}</button>&nbsp;`
//   );
//   restoreRange(contentRef.current!);

//   setShowTitleList(false);
// };
