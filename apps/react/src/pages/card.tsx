import React, { useMemo } from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import Markdown from "react-markdown";
export function CardWrapper(p: {
  title: string;
  subheader?: string;
  href?: string;
  body: string;
  img?: {
    src: string;
    pos: "left" | "right";
  };
}) {
  const markdown = useMemo(() => {
    return cleanupMarkdown(p.body);
  }, [p.body]);
  return (
    <Card
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      variant="outlined"
    >
      {p.img?.pos === "left" && (
        <img
          style={{
            width: "30%",
            objectFit: "contain",
          }}
          src={p.img.src}
        />
      )}
      <Box>
        <CardHeader title={p.title} subheader={p.subheader} />
        <CardContent sx={{ marginTop: "-20px" }}>
          <Markdown>{markdown}</Markdown>
        </CardContent>
      </Box>
      {p.img?.pos === "right" && (
        <img
          src={p.img.src}
          style={{
            width: "30%",
            objectFit: "contain",
          }}
        />
      )}
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
