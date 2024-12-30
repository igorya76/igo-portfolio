import React from "react";
import { Box, Typography } from "@mui/material";
import { Internal_Budget, useBudgetHook } from "./context";
import {
  DataGridPremium,
  GridRenderCellParams,
  GridRenderRowProps,
} from "@mui/x-data-grid-premium";
import { Code } from "@mui/icons-material";

export function BudgetTable() {
  const hook = useBudgetHook();
  return (
    <DataGridPremium
      sx={{ height: "100%" }}
      slots={{
        toolbar: () => (
          <Box sx={{ padding: "5px" }}>
            <Typography variant="caption">Budget</Typography>
          </Box>
        ),
      }}
      initialState={{
        aggregation: {
          model: {
            budget: "sum",
            cost: "sum",
            variance: "sum",
          },
        },
        rowGrouping: {
          model: ["division", "code"],
        },
        columns: {
          columnVisibilityModel: {
            code: false,
            division: false,
          },
        },
      }}
      groupingColDef={{
        width: 250,
      }}
      isGroupExpandedByDefault={() => true}
      rows={hook.budget}
      onCellClick={(p, e, d) => {
        console.log({ p, e, d });
        let rowId = p.id.toString();
        if (rowId.includes("auto-generated")) {
          let parts = rowId.split("/");
          if (parts.length == 2) {
            hook.updateFiltersFromInteraction({
              costcode: "all",
              costType: "all",
              division: parts[1],
            });
          } else if (parts.length == 3) {
            hook.updateFiltersFromInteraction({
              costcode: parts[2],
              costType: "all",
              division: "all",
            });
          }
        }
      }}
      columns={[
        { field: "division", headerName: "Division" },
        {
          field: "code",
          headerName: "Cost Code",
          groupingValueGetter: (v, r) => `${v}-${r.description}`,
        },
        {
          headerName: "Description",
          field: "description",
          width: 200,
        },
        {
          headerName: "Category",
          field: "cost_type",
          align: "center",
        },
        {
          headerName: "Budget",
          field: "budget",
          type: "number",
          valueGetter: (c, r) => {
            return r.value;
          },
          align: "right",
          // type: "number",
          renderCell: CurrencyRenderCell as any,
        },
        {
          headerName: "Cost",
          field: "cost",
          type: "number",
          renderCell: CurrencyRenderCell as any,
        },
        {
          headerName: "Variance",
          field: "variance",
          type: "number",
          renderCell: CurrencyRenderCell as any,
        },
      ]}
      density="compact"
    />
  );
}

function CurrencyRenderCell(r: GridRenderCellParams) {
  let val = r.value as number;
  let color = val >= 0 ? "black" : "red";
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color,
      }}
    >
      <div>$</div>
      <div>{val?.toLocaleString()}</div>
    </Box>
  );
}
