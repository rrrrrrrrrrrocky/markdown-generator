import "dayjs/locale/ko";
// import i18next, { InitOptions } from "i18next";
// import "@/resource/style/global.css";
import "@/resource/style/global.css";

import dayjs, { locale } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// const ko = {
//   toolbar: {
//     undo: "되돌리기 {{shortcut}}",
//     redo: "원래대로 {{shortcut}}",
//     blockTypeSelect: {
//       placeholder: "Select block type",
//     },

//     blockTypes: {
//       paragraph: "p",
//       heading: "h{{level}}",
//       quote: "quote",
//     },
//   },
// };

// const i18nDefaultOption: InitOptions<unknown> = {
//   // defaultLocale: "ko",
//   // locales: ["ko", "en"],
//   // localeConfigs: {
//   //   en: {
//   //     htmlLang: "en-GB",
//   //   },
//   //   ko: {
//   //     htmlLang: "ko-KR",
//   //   },
//   // },
//   lng: "ko",
//   debug: true,
//   resources: {
//     ko: {
//       translation: ko,
//     },
//   },
// };
export const initializeGlobalApp = () => {
  // i18next.init(i18nDefaultOption);
};

export const initializeApp = () => {
  // do initialize something when app mount
};

/**
 * @description 새로고침, 뒤로가기버튼 등 감지
 * @type {NavigationTimingType = "back_forward" | "navigate" | "prerender" | "reload"}
 */
export const testNativeNavigationType = () => {
  const entries = performance.getEntriesByType("navigation")[0];
  const entriesNavigationTiming = entries as PerformanceNavigationTiming;
  // TODO: 네이티브 뒤로가기 및 새로고침을 테스트 하기 위한 콘솔입니다. react에서는 reload만 인지하기 떄문에 추가 작업 필요
  // eslint-disable-next-line no-console
  console.log("checkNavigationType >>>", entriesNavigationTiming.type);
};
