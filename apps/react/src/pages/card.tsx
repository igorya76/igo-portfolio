import React, { useMemo } from "react";
import { Card, CardHeader, CardContent, Box } from "@mui/material";
import Markdown from "react-markdown";
import { MarkdownViewer } from "../markdown";
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
          <MarkdownViewer markdown={p.body} />
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
