import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  ClickAwayListener,
  colors,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useMemo } from "react";
import { useBudgetHook } from "./context";
import { sumBy } from "lodash-es";
import { useBoolean, useValue } from "../../hooks";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
const chartDefs = {
  ["Division Budget vs Cost"]: DivisionBudgetVsCost,
  ["Cost by Month"]: CostByMonth,
};
export default function ChartsOverviewDemo() {
  const chart = useValue<keyof typeof chartDefs>("Division Budget vs Cost");
  const Component = useMemo(() => {
    return chartDefs[chart.value];
  }, [chart.value]);
  return (
    <Card variant="outlined" sx={{ width: "600px" }}>
      <CardHeader
        subheader={chart.value}
        action={<ChartSelectorButton value={chart as any} />}
      />
      <Component />
    </Card>
  );
}

function DivisionBudgetVsCost() {
  const hook = useBudgetHook();
  function calcData() {
    const jc = hook.job_cost.map((j) => ({
      ...j,
    }));
    let divisions = hook.budget.map((h) => h.division);
    let uDivsions = [...new Set(divisions)];

    let data = uDivsions.map((d) => {
      let costDetails = jc.filter((j) => j.division === d);
      let costVal = sumBy(costDetails, "value");
      let budgetDetails = hook.budget.filter((j) => j.division === d);
      let budgetVal = sumBy(budgetDetails, "value");

      return {
        budgetVal,
        costVal,
      };
    });
    return {
      yAxis: [
        {
          label: "Budget",
          data: data.map((d) => d.budgetVal),
        },
        {
          label: "Cost",
          data: data.map((d) => d.costVal),
        },
      ],
      xAxis: uDivsions,
    };
  }
  let data = useMemo(() => {
    return calcData();
  }, [hook.job_cost]);
  return (
    <>
      <BarChart
        colors={["green", "red"]}
        series={data.yAxis}
        height={350}
        xAxis={[
          {
            data: data.xAxis,
            scaleType: "band",
          },
        ]}
        margin={{ top: 50, bottom: 30, left: 60, right: 10 }}
        onItemClick={(e, b) => {
          let indexData = data.xAxis[b.dataIndex];
          console.log("clic", b, indexData);
          hook.updateFiltersFromInteraction({
            division: indexData,
          });
        }}
      />
    </>
  );
}

function CostByMonth() {
  const hook = useBudgetHook();
  function calcData() {
    const jc = hook.job_cost.map((j) => ({
      ...j,
    }));
    let divisions = jc.map((j) => j.division);
    let months = jc.map((j) => j.month);
    let uDivsions = [...new Set(divisions)];
    let uMonths = [...new Set(months)];

    let data = uDivsions.map((d) => {
      let series = uMonths.map((u) => {
        let details = jc.filter((j) => j.division === d && j.month === u);
        return sumBy(details, "value");
      });
      return {
        label: d,
        data: series,
        stack: "total",
      };
    });
    return {
      yAxis: data,
      xAxis: uMonths,
    };
  }
  let data = useMemo(() => {
    return calcData();
  }, [hook.job_cost]);

  return (
    <>
      <BarChart
        series={data.yAxis}
        height={400}
        xAxis={[{ data: data.xAxis, scaleType: "band" }]}
        margin={{ top: 150, bottom: 30, left: 60, right: 10 }}
        onItemClick={(e, b) => {
          let indexData = data.xAxis[b.dataIndex];
          console.log("clic", b, indexData);
          hook.updateFiltersFromInteraction({
            month: indexData,
          });
        }}
      />
    </>
  );
}

function ChartSelectorButton(p: {
  value: ReturnType<typeof useValue<string>>;
}) {
  const { value } = p;
  const isOpen = useBoolean(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const options = Object.keys(chartDefs);
  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
        <Button
          size="small"
          aria-controls={isOpen.value ? "split-button-menu" : undefined}
          aria-expanded={isOpen.value ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={isOpen.toggle}
        >
          <ArrowDropDownCircleOutlined />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={isOpen.value}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={isOpen.toggle}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={option === value.value}
                      selected={option === value.value}
                      onClick={(event) => {
                        value.set(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
