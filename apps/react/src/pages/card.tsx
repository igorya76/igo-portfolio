import React, { useMemo } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import Markdown from "react-markdown";
export function CardWrapper(p: {
  title: string;
  subheader?: string;
  href?: string;
  body: string;
}) {
  const markdown = useMemo(() => {
    return cleanupMarkdown(p.body);
  }, [p.body]);
  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <CardHeader title={p.title} subheader={p.subheader} />
      <CardContent sx={{ marginTop: "-20px" }}>
        <Markdown>{markdown}</Markdown>
      </CardContent>
    </Card>
  );
}

export function cleanupMarkdown(markdown: string) {
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
