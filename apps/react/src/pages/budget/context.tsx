import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";

type Tprops = {
  //Add Props for Context
};

const InternalContext = createContext<ReturnType<typeof internalHook>>(
  {} as any
);

export function Internal_Budget(p: { children: any }) {
  const hook = internalHook(p);

  return (
    <InternalContext.Provider value={hook}>
      {p.children}
    </InternalContext.Provider>
  );
}
/**
 * hook to access and manipulate context
 * @returns
 */
export function useBudgetHook() {
  return useContext(InternalContext);
}
import { COSTCODES } from "./data/cost_codes";
import { DIVISIONS } from "./data/divsions";
import { LINEITEMS } from "./data/line_items";
import { v4 } from "uuid";
import { filter, sumBy } from "lodash-es";
import { useBoolean, useRecord } from "../../hooks";
function internalHook(p: Tprops) {
  const filters = useRecord<{
    division: string | "all";
    costcode: string | "all";
    costType: string | "all";
    vendor: string | "all";
    month: string | "all";
  }>({
    division: "all",
    costType: "all",
    costcode: "all",
    vendor: "all",
    month: "all",
  });
  console.log({ filters });
  const aggregated = useMemo(() => {
    let all = LINEITEMS.map((l) => {
      const code = COSTCODES.find((c) => c.code === l.code);
      const division = DIVISIONS.find(
        (c) => c.division === l.code.split("-")[0]
      );
      let date = new Date(l.date_string);
      return {
        ...l,
        description: code?.description,

        _group: `${l.code}-${l.cost_type}`,
        division: `${division?.division}-${division?.name}`,
        date: date,
        month: `${date.getFullYear()}-${date.getMonth()}`,
        id: v4(),
      };
    }).filter((l) => {
      let filter = filters.value;
      let isDivision = true;
      let iscostType = true;
      let isCostCode = true;
      let isVendor = true;
      let isMonth = true;
      if (filter?.division != "all") {
        isDivision = filter?.division === l.division;
      }
      if (filter?.costType != "all") {
        iscostType = filter?.costType === l.cost_type;
      }
      if (filter?.costcode != "all") {
        isCostCode = filter?.costcode === `${l.code}-${l.description}`;
      }
      if (l.type === "job_cost") {
        if (filter?.vendor != "all") {
          isVendor = filter?.vendor === l.vendor;
        }
        if (filter?.month != "all") {
          isMonth = filter?.month === l.month;
        }
      }
      return isDivision && isCostCode && iscostType && isVendor && isMonth;
    });
    const job_cost = all.filter((c) => c.type === "job_cost");
    const budget = all
      .filter((c) => c.type === "budget")
      .map((b) => {
        let costDetails = job_cost.filter((c) => c._group === b._group);
        let cost = sumBy(costDetails, "value");
        return {
          ...b,
          details: costDetails,
          cost,
          variance: b.value - cost,
        };
      });
    console.log({ all, budget, job_cost });
    return {
      all,
      budget,
      job_cost,
      cost_types: [...new Set(job_cost.map((j) => j.cost_type))],
      vendors: [...new Set(job_cost.map((j) => j.vendor))],
      months: [...new Set(job_cost.map((j) => j.month))],
    };
  }, [filters.value]);

  const showFilter = useBoolean(false);

  return {
    ...aggregated,
    filters,
    divsions: DIVISIONS,
    costcodes: COSTCODES,
    hasFilters: () => {
      const f = filters.value;
      if (!f) return;
      let hasFilter = Object.keys(f).filter((k) => f[k] != "all");
      console.log({ hasFilter, filters });
      return hasFilter.length > 0;
    },
    updateFiltersFromInteraction: (r: Partial<(typeof filters)["value"]>) => {
      if (!r) return;
      showFilter.toggleTimeOut(50);
      console.log("update", r);
      filters.update(r);
    },
    resetFilters: () => {
      showFilter.toggleTimeOut(50);
      filters.reset();
    },
    showFilter,
  };
}
