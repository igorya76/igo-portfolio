import React, { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Internal_Calculator, useCalculatorHook } from "./context";
import { NewEntryCard } from "./newEntry";
import { Table } from "./table";
import { FlexBoxAutoHeight } from "../../../components/max-flex";
import { PlaygroundHeader } from "../header";
import { playGroundDef } from "../def";
export function BillOfMaterials() {
  const def = playGroundDef["bom"];
  return (
    <Internal_Calculator>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <FlexBoxAutoHeight
            header={<PlaygroundHeader {...def} />}
            body={
              <Box
                sx={{
                  height: "100%",
                  "@media (min-width: 900px)": {
                    display: "block",
                  },
                  "@media (min-width: 1200px)": {
                    display: "flex",
                  },
                }}
              >
                <NewEntryCard />
                <Table />
              </Box>
            }
          />
        </Box>
      </Container>
    </Internal_Calculator>
  );
}
