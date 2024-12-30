import React from "react";

type tPageDef = {
  display: string;
  path: string;
  component: React.ReactNode;
};
import { AboutPage } from "./about";
import { BillOfMaterials } from "./bf_calculator";
import { BudgetAnalyzer } from "./budget";
export const pageDef: tPageDef[] = [
  {
    display: "About",
    path: "about",
    component: <AboutPage />,
  },
  {
    display: "Bill of Materials",
    path: "billOfMaterials",
    component: <BillOfMaterials />,
  },
  {
    display: "Job Budget",
    path: "jobbudget",
    component: <BudgetAnalyzer />,
  },
];
