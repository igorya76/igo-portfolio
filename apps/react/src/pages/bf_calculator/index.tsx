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
import { FlexBoxAutoHeight } from "../../components/max-flex";
export function BillOfMaterials() {
  return (
    <Internal_Calculator>
      <Container sx={{ height: "100%" }}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <FlexBoxAutoHeight
            header={
              <Box sx={{ padding: "5px" }}>
                <Typography variant="h6">Bill of Materials </Typography>
                <Typography variant="body2">
                  {" "}
                  Calculator assists in generating a material and cost list for
                  a construction project.
                </Typography>
              </Box>
            }
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
