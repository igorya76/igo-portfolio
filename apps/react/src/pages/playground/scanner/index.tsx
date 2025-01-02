import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { FlexBoxAutoHeight } from "../../../components/max-flex";
import { MobileScanner } from "./mobile";
import { WebScanner } from "./web";
import { useIsWindowMaxWidth } from "../../../hooks/muiScreenWidth";
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
export function BarcodeScannerEntry() {
  const isWeb = useIsWindowMaxWidth(900);
  const nav = useNavigate();
  const route = useLocation();
  const code = useMemo(() => {
    const search = window.location.search;
    let code = uuid();
    if (search.includes("code")) {
      code = search.split("=")[1];
    }
    nav(`${route.pathname}?code=${code}`);
    // let code = search.get("code");
    // window.location.search = `code=${code}`;
    return code;
  }, []);
  return (
    <Container>
      <FlexBoxAutoHeight
        header={
          <Typography
            variant="h6"
            sx={{ paddingTop: "10px", paddingBottom: "5px" }}
          >
            Barcode / QR Code Scanner
          </Typography>
        }
        body={
          <>
            {!isWeb ? (
              <WebScanner code={code} />
            ) : (
              <MobileScanner code={code} />
            )}
          </>
        }
      />
    </Container>
  );
}
