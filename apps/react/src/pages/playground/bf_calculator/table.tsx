import React, { useMemo } from "react";
import { tRow, useCalculatorHook } from "./context";
import {
  DataGridPremium,
  GridActionsCell,
  GridActionsCellItem,
  GridDeleteIcon,
  GridRenderCellParams,
} from "@mui/x-data-grid-premium";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useIsWindowMaxWidth } from "../../../hooks/muiScreenWidth";
export function Table() {
  const isMobile = useIsWindowMaxWidth(900);
  return useMemo(() => {
    if (isMobile) {
      return <ListView />;
    }
    return <TableView />;
  }, [isMobile]);
}
export function TableView() {
  const hook = useCalculatorHook();
  const total = sumBy(hook.estimate.list, "extended");
  return (
    <DataGridPremium
      sx={{ height: "100%" }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            thickness: false,
            width: false,
            length: false,
          },
        },
      }}
      slots={{
        footer: () => {
          return (
            <Box
              sx={{ display: "flex", justifyContent: "right", width: "100%" }}
            >
              <Typography>Total: ${total.toFixed(2)}</Typography>
            </Box>
          );
        },
      }}
      columns={[
        {
          field: "description",
          headerName: "Description",
          width: 300,
        },
        { field: "quantity", headerName: "Qty" },
        { field: "thickness" },
        { field: "width" },
        { field: "length" },
        {
          field: "cost",
          type: "number",
          headerName: "$ / Qty",
        },
        { field: "measure", headerName: "Measure", type: "number" },
        { field: "extended", headerName: "$ Extended", type: "number" },
        {
          field: "actions",
          type: "actions",
          getActions: (r) => {
            return [
              <>
                <GridActionsCellItem
                  icon={<GridDeleteIcon />}
                  label="Delete"
                  onClick={() => {
                    hook.estimate.delete(r.id as string);
                  }}
                />
              </>,
            ];
          },
        },
      ]}
      rows={hook.estimate.list}
    />
  );
}
import { sumBy } from "lodash-es";
function ListView() {
  const hook = useCalculatorHook();
  const total = sumBy(hook.estimate.list, "extended");
  return (
    <Card
      variant="outlined"
      sx={{ height: "auto", maxHeight: "100%", overflow: "auto" }}
    >
      <CardHeader subheader={"List"} action={<></>} />
      <Divider />
      <List>
        {hook.estimate.list.map((r, k) => {
          return (
            <ListItem
              key={k}
              secondaryAction={
                <IconButton
                  onClick={() => {
                    if (confirm("Are you sure you want to delete?")) {
                      hook.estimate.delete(r.id);
                    }
                  }}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText
                secondary={
                  <>
                    <div>
                      {r.quantity} ea {r.measure} {r.unit} @ {r.cost} = $
                      {r.extended.toFixed(2)}
                    </div>
                  </>
                }
              >
                {r.description}
              </ListItemText>
            </ListItem>
          );
        })}
        <ListItem>
          <Box sx={{ display: "flex", justifyContent: "right", width: "100%" }}>
            <Typography variant="button">Total: ${total.toFixed(2)}</Typography>
          </Box>
        </ListItem>
      </List>
    </Card>
  );
}
