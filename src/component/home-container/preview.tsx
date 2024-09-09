import { markedClientParse } from "@/script/util/markdown-utils";
import "./preview.css";

const Preview = ({ innerText }: { innerText: string }) => {
  const htmlString = markedClientParse(innerText);
  let domParser = new DOMParser();
  let doc = domParser.parseFromString(htmlString, "text/html");
  console.log("doc >>", doc);
  // return <iframe src={doc} />;
};

export default Preview;
