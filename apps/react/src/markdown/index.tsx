import React, { useMemo } from "react";
import Markdown from "react-markdown";
export function MarkdownViewer(p: { markdown: string }) {
  const mkd = useMemo(() => {
    return cleanupMarkdown(p.markdown);
  }, [p.markdown]);

  return <Markdown>{mkd}</Markdown>;
}

function cleanupMarkdown(markdown: string) {
  let lines = markdown.split("\n").slice(1, -1);
  let newArray: string[] = [];
  let stripIndex = 0;
  for (let line of lines) {
    if (!stripIndex) {
      let str = line;
      const trimmedStr = str.trimStart();
      stripIndex = str.indexOf(trimmedStr[0]);
    }
    const newLine = line.slice(stripIndex, line.length + 1);
    newArray.push(newLine);
  }

  return newArray.join("\n");
}
