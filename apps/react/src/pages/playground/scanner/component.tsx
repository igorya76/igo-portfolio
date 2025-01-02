import { Button } from "@mui/material";
import { Scanner, outline, useDevices } from "@yudiel/react-qr-scanner";
import {
  IScannerClassNames,
  IScannerProps,
  IScannerStyles,
} from "@yudiel/react-qr-scanner";
import React, { useState } from "react";

export type TqrCodeScanner = Partial<{
  constraints: Partial<MediaTrackConstraints>;
  formats: BarcodeFormat[];
  paused: boolean;
  components: IScannerProps;
  classNames: IScannerClassNames;
  styles: IScannerStyles;
  cameraToggle?: boolean;
}>;

export function CameraQrScanner(p: {
  onScan: (decoded: string) => void;
  onError: (error: string) => void;
  qrProps: TqrCodeScanner;
}) {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  let devices = useDevices();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <select onChange={(e) => setDeviceId(e.target.value)}>
        <option value={undefined}>Select a Device</option>
        {devices.map((d, index) => (
          <option key={index} value={d.deviceId}>
            {d.label}
          </option>
        ))}
      </select>
      <Scanner
        onScan={(res) => {
          console.log("scanner data", res);
          p.onScan(res[0].rawValue);
        }}
        onError={(err) => {
          console.log({ err });
        }}
        paused={p.qrProps.paused || false}
        components={{
          onOff: false,
          audio: true,
          finder: false,
          zoom: true,
          torch: true,
          // tracker: outline,
          ...p.qrProps.components,
        }}
        allowMultiple={true}
        constraints={{
          facingMode: {
            ideal: "environment",
          },
          deviceId: deviceId,
          ...p.qrProps.constraints,
        }}
        styles={
          {
            // finderBorder: 1,
          }
        }
        scanDelay={1000}
      />
    </div>
  );
}
