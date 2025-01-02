import React from "react";
import { FlexBoxAutoHeight } from "../../../components/max-flex";
import { Box, Container, Typography } from "@mui/material";
import { Internal_Budget, useBudgetHook } from "./context";
import { BudgetTable } from "./budgetTable";
import { DetailsTable } from "./detailsTable";
import { FilterBar } from "./filter";
import ChartsOverviewDemo from "./chart";
import { PlaygroundHeader } from "../header";
import { playGroundDef } from "../def";

export function BudgetAnalyzer() {
  const def = playGroundDef["budget"];

  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Internal_Budget>
        <FlexBoxAutoHeight
          header={<PlaygroundHeader {...def} />}
          body={<TableBody />}
        />
      </Internal_Budget>
    </Container>
  );
}

function TableBody() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        height: "100%",
        paddingTop: "10px",
      }}
    >
      <FlexBoxAutoHeight body={<BudgetTable />} />
      <FlexBoxAutoHeight
        header={<ChartsOverviewDemo />}
        body={<DetailsTable />}
      />
    </Box>
  );
}
