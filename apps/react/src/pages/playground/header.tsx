import React, { useMemo } from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { TpgDef } from "./def";
import { Close, Info } from "@mui/icons-material";
import { MarkdownViewer } from "../../markdown";
import { useBoolean } from "../../hooks";
export function PlaygroundHeader(p: TpgDef) {
  const about = useMemo(() => {
    return p.about();
  }, [p.about]);
  const isOpen = useBoolean(false);
  return (
    <Box>
      <CardHeader
        title={about.title}
        action={
          about.details.length && (
            <IconButton onClick={isOpen.toggle}>
              <Info />
            </IconButton>
          )
        }
        subheader={about.summary}
      />
      <Drawer
        open={isOpen.value}
        anchor="right"
        onClose={isOpen.toggle}
        sx={{
          zIndex: 100001,
        }}
      >
        <CardHeader
          title={about.title}
          action={
            <IconButton onClick={isOpen.toggle}>
              <Close />
            </IconButton>
          }
          subheader={about.summary}
        />
        <CardContent>
          <MarkdownViewer markdown={about.details} />
        </CardContent>
      </Drawer>
    </Box>
  );
}
