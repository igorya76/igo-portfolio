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
  const isOpen = useBoolean(false);
  return (
    <Box>
      <Drawer
        open={isOpen.value}
        anchor="right"
        onClose={isOpen.toggle}
        sx={{
          zIndex: 100001,
        }}
      ></Drawer>
    </Box>
  );
}
