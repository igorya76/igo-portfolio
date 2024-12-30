import { useMediaQuery, useTheme } from "@mui/material";

export function useIsWindowMinWidth(minWidth: number) {
  return useMediaQuery(`(min-width:${minWidth}px)`);
}

export function useIsWindowMaxWidth(minWidth: number) {
  return useMediaQuery(`(max-width:${minWidth}px)`);
}
