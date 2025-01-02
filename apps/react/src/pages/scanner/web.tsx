import React, { useState } from "react";
import { CameraQrScanner } from "./component";
import { useBoolean, useValue } from "../../hooks";
import { Box, Typography } from "@mui/material";
import QRcode from "react-qr-code";
import Barcode from "react-barcode";
import { v4 as uuid } from "uuid";
import { useWebSocketHook } from "./useWsHook";
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
          <CodeContainer name="Scan QR Code with your Phone" active={false}>
            <QRcode
              size={256}
              style={{ maxWidth: "250px", width: "250px" }}
              value={`https://portfolio.igo.codes/app/qr_scanner?code=${p.code}`}
              viewBox={`0 0 256 256`}
            />
          </CodeContainer>
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
          <CodeContainer name="Barcode" active={scannedCode.isValue("string")}>
            <Barcode value={"9898900"} format="CODE128" />
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
    // vendor: navigator.vendor,
    // language: navigator.language,
    // languages: navigator.languages,
    // cookieEnabled: navigator.cookieEnabled,
    // onLine: navigator.onLine,
    // doNotTrack: navigator.doNotTrack,
    // hardwareConcurrency: navigator.hardwareConcurrency,
    // maxTouchPoints: navigator.maxTouchPoints,

    // Screen properties
    // screenResolution: {
    //   width: window.screen.width,
    //   height: window.screen.height,
    //   availWidth: window.screen.availWidth,
    //   availHeight: window.screen.availHeight,
    //   colorDepth: window.screen.colorDepth,
    //   pixelDepth: window.screen.pixelDepth,
    //   orientation: window.screen.orientation.type,
    // },

    // // Window properties
    // windowSize: {
    //   innerWidth: window.innerWidth,
    //   innerHeight: window.innerHeight,
    //   outerWidth: window.outerWidth,
    //   outerHeight: window.outerHeight,
    // },

    // Device pixel ratio
    // devicePixelRatio: window.devicePixelRatio,
  };
  console.log({ d });
  return d;
}
