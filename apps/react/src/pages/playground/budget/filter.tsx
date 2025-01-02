import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useBudgetHook } from "./context";
import React from "react";
export function FilterBar() {
  const hook = useBudgetHook();

  return (
    <Box sx={{ display: "flex", alignItems: "center", paddingTop: "10px" }}>
      <Typography sx={{ paddingRight: "12px" }} variant="caption">
        Filter:
      </Typography>
      <Autocomplete
        sx={{ width: 200 }}
        size="small"
        options={hook.divsions.map((d) => `${d.division}-${d.name}`)}
        renderInput={(p) => <TextField {...p} label="Division" />}
        value={hook.filters.value?.division || "all"}
        onChange={(e, value) => {
          hook.filters.update({ division: value || "all" });
        }}
      />
      <Autocomplete
        sx={{ width: 200 }}
        size="small"
        options={hook.costcodes.map((d) => `${d.code}-${d.description}`)}
        renderInput={(p) => <TextField {...p} label="Cost Code" />}
        value={hook.filters.value?.costcode || "all"}
        onChange={(e, value) => {
          hook.filters.update({ costcode: value || "all" });
        }}
      />
      <Autocomplete
        sx={{ width: 200 }}
        size="small"
        options={hook.vendors.map((d) => `${d}`)}
        renderInput={(p) => <TextField {...p} label="Vendor" />}
        value={hook.filters.value?.vendor || "all"}
        onChange={(e, value) => {
          hook.filters.update({ vendor: value || "all" });
        }}
      />
      <Autocomplete
        sx={{ width: 200 }}
        size="small"
        options={hook.months.map((d) => `${d}`)}
        renderInput={(p) => <TextField {...p} label="Month" />}
        value={hook.filters.value?.month || "all"}
        onChange={(e, value) => {
          hook.filters.update({ month: value || "all" });
        }}
      />
      <TextField
        sx={{ width: "115px" }}
        select
        size="small"
        label="Cost Type"
        value={hook.filters.value?.costType}
        onChange={(e) => {
          hook.filters.update({ costType: e.target.value || "all" });
        }}
      >
        <MenuItem value={"all"}>{"all"}</MenuItem>
        {hook.cost_types.map((t, k) => (
          <MenuItem value={t} key={k}>
            {t}
          </MenuItem>
        ))}
      </TextField>
      {hook.hasFilters() && <Button onClick={hook.filters.reset}>Reset</Button>}
    </Box>
  );
}
