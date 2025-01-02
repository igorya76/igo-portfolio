import React, { useMemo } from "react";
import { CameraQrScanner } from "./component";
import { useValue } from "../../../hooks";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import JsonViewer from "@uiw/react-json-view";
import { useWebSocketHook } from "./useWsHook";
import { Close } from "@mui/icons-material";

export function MobileScanner(p: { code: string }) {
  const scannedData = useValue<string | undefined>(undefined);
  const socket = useWebSocketHook({ ...p, mode: "mobile" });
  const data = useMemo(() => {
    if (!scannedData.value) return undefined;
    let d = getContentType(scannedData.value);
    socket.sendScan(d.type);
    return d;
  }, [scannedData.value]);
  console.log({ data });
  return (
    <Box sx={{ height: "100%" }}>
      <CameraQrScanner
        onError={() => {}}
        onScan={(s) => scannedData.set(s)}
        qrProps={{}}
      />
      <Drawer open={Boolean(scannedData.value)} anchor="bottom">
        <Box sx={{ height: "60vh" }}>
          <CardHeader
            subheader={"Scanned (encoded) Data"}
            action={
              <IconButton
                onClick={() => {
                  scannedData.reset();
                }}
              >
                <Close />
              </IconButton>
            }
          />
          {data && (
            <CardContent sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
              {data.type === "url" && (
                <>
                  <Typography variant="h6">Web Site</Typography>
                  <Typography>{data.value}</Typography>
                  <Button
                    onClick={() => {
                      window.open(data.value, "_blank");
                    }}
                  >
                    Open
                  </Button>
                </>
              )}
              {data.type === "string" && (
                <>
                  <Typography variant="h6">Text</Typography>
                  <Typography>{data.value}</Typography>
                </>
              )}
              {data.type === "json" && (
                <>
                  <Typography variant="h6">JSON Data</Typography>
                  <JsonViewer value={data.value} />
                </>
              )}
            </CardContent>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}

function getContentType(rawString: string):
  | {
      type: "url" | "string";
      value: string;
    }
  | {
      type: "json";
      value: Record<any, any>;
    } {
  let string = rawString.trim();
  //*Is Url?
  if (string.startsWith("http")) {
    return { type: "url", value: string };
  }
  if (string.startsWith("{") && string.endsWith("}")) {
    return { type: "json", value: JSON.parse(rawString) };
  }
  return { type: "string", value: string };
}
