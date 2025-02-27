import React, { useState } from "react";
import { CameraQrScanner } from "./component";
import { useBoolean, useValue } from "../../../hooks";
import { Box, Typography } from "@mui/material";
import QRcode from "react-qr-code";
import Barcode from "react-barcode";
import { v4 as uuid } from "uuid";
import { useWebSocketHook } from "./useWsHook";
import { MarkdownViewer } from "../../../markdown";
export function WebScanner(p: { code: string }) {
  const scannedCode = useValue("");

  const socket = useWebSocketHook({
    ...p,
    mode: "web",
    watchScans: (code) => {
      console.log("watch", code);
      if (code === scannedCode.value) return;
      scannedCode.set(code);
    },
  });
  console.log({ scannedCode });

  const hasMobileClient = socket.hasClient("mobile");
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {hasMobileClient == false ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <HowToUse />
            <CodeContainer name="" active={false}>
              <QRcode
                size={256}
                style={{ maxWidth: "250px", width: "250px" }}
                value={`https://portfolio.igo.codes/app/playground/qr_scanner?code=${p.code}`}
                viewBox={`0 0 256 256`}
              />
            </CodeContainer>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CodeContainer name="JSON" active={scannedCode.isValue("json")}>
            <QRcode
              size={256}
              style={{ maxWidth: "250px", width: "250px" }}
              value={JSON.stringify(getBrowserInfo())}
              viewBox={`0 0 256 256`}
            />
          </CodeContainer>
          <CodeContainer name="JSON" active={scannedCode.isValue("text")}>
            <QRcode
              size={256}
              style={{ maxWidth: "250px", width: "250px" }}
              value={"Text"}
              viewBox={`0 0 256 256`}
            />
          </CodeContainer>
          <CodeContainer
            name="Open Google Maps"
            active={scannedCode.isValue("url")}
          >
            <QRcode
              size={256}
              style={{ maxWidth: "250px", width: "250px" }}
              value={"https://google.com/maps"}
              viewBox={`0 0 256 256`}
            />
          </CodeContainer>
        </div>
      )}
    </Box>
  );
}

function CodeContainer(p: { name: string; children: any; active: boolean }) {
  return (
    <Box
      sx={{
        width: "300px",
        height: "300px",
        border: p.active ? "3px solid coral" : undefined,
        borderRadius: 5,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1">{p.name}</Typography>
      {p.children}
    </Box>
  );
}

function getBrowserInfo() {
  let d = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
  };
  console.log({ d });
  return d;
}

function HowToUse() {
  return (
    <Box>
      <MarkdownViewer
        markdown={`
        ## How to Use
        
        - Scan code with your phone.
        - Browser window will show some QR Codes.
        - When Scanning:
            - Mobile View will show contents and prompt applicable redirects.
            - Browser View the active QR Code will be highlighted 
        `}
      />
    </Box>
  );
}
