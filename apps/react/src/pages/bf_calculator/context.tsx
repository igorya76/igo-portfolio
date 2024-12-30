import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  useArrayLocalStorage,
  useBoolean,
  useRecord,
  useValue,
} from "../../hooks";
import { constructionUnitOfMeasures } from "./calculations";
import { v4 } from "uuid";
import {
  useIsWindowMaxWidth,
  useIsWindowMinWidth,
} from "../../hooks/muiScreenWidth";

type Tprops = {
  //Add Props for Context
};

const InternalContext = createContext<ReturnType<typeof internalHook>>(
  undefined as any
);

export function Internal_Calculator(p: Tprops & { children: any }) {
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
export function useCalculatorHook() {
  return useContext(InternalContext);
}
export type tRecord = {
  quantity: number;
  cost: number;
  thickness: number | undefined;
  thickness_unit: "in" | "ft";
  width: number | undefined;
  width_unit: "in" | "ft";
  length: number | undefined;
  length_unit: "in" | "ft";
  description: string;
};
export type tRow = tRecord & {
  id: string;
  unit: string;
  measure: number;
  extended: number;
};
function internalHook(p: Tprops) {
  const activeMethod = useValue<string | undefined>(undefined);
  const record = useRecord<tRecord>({
    quantity: 1,
    cost: 0,
    thickness: undefined,
    thickness_unit: "in",
    width: undefined,
    width_unit: "in",
    length: undefined,
    length_unit: "ft",
    description: "",
  });
  const estimate = useArrayLocalStorage<tRow>("estimate", "id");

  const isFormVisible = useBoolean(true);

  function getCalcDef() {
    return constructionUnitOfMeasures.find(
      (c) => c.abbrev === activeMethod.value
    );
  }

  const calcDef = useMemo(() => {
    if (!activeMethod.value) return;
    return getCalcDef();
  }, [activeMethod.value]);

  return {
    setCalcMethod: (val: string) => {
      isFormVisible.setFalse();
      activeMethod.set(val);
      setTimeout(() => {
        isFormVisible.setTrue();
      }, 1000);
    },
    activeMethod: activeMethod,
    record,
    isFormVisible,
    resetForm: () => {
      isFormVisible.setFalse();
      record.reset();
      setTimeout(() => {
        isFormVisible.setTrue();
      }, 1000);
    },
    calculated: useMemo(() => {
      if (!record.value) return undefined;
      if (!calcDef) return undefined;
      const measure = calcDef.formula(record.value);
      return {
        measure,
        cost: measure * record.value.cost,
      };
    }, [record.value]),
    getCalcDef: calcDef,
    estimate,
    addToEstimate: () => {
      if (!calcDef || !record.value) return;
      let measure = calcDef.formula(record.value);
      estimate.add({
        ...(record.value as any),
        id: v4(),
        unit: activeMethod.value,
        measure,
        extended: record.value.cost * measure,
      });
      record.reset();
      activeMethod.reset();
    },
    isMobile: useIsWindowMaxWidth(900),
  };
}
