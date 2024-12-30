import React from "react";
import { Box, Typography } from "@mui/material";
import { Internal_Budget, useBudgetHook } from "./context";
import {
  DataGridPremium,
  GridRenderCellParams,
  GridRenderRowProps,
} from "@mui/x-data-grid-premium";
import { Code } from "@mui/icons-material";

export function DetailsTable() {
  const hook = useBudgetHook();
  return (
    <DataGridPremium
      sx={{ height: "100%", width: "600px" }}
      slots={{
        toolbar: () => (
          <Box sx={{ padding: "5px" }}>
            <Typography variant="caption">Job Cost Details</Typography>
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
          // model: ["division", "code"],
        },
        columns: {
          columnVisibilityModel: {},
        },
      }}
      groupingColDef={{
        width: 250,
      }}
      onCellClick={(p) => {
        if (p.field === "description" || p.field === "cost") return;
        hook.updateFiltersFromInteraction({
          costcode:
            p.field === "code" ? `${p.row.code}-${p.row.description}` : "all",
          costType: "all",
          division: "all",
          vendor: p.field === "vendor" ? p.row.vendor : "all",
        });
      }}
      rows={hook.job_cost}
      columns={[
        {
          field: "code",
          headerName: "Cost Code",
          valueGetter: (v, r) => `${v}-${r.description}`,
        },
        {
          headerName: "Description",
          field: "description",
          width: 200,
        },
        {
          headerName: "Vendor",
          field: "vendor",
          width: 150,
        },
        {
          headerName: "Cost",
          field: "value",
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
  let color = val > 0 ? "black" : "red";
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
