import React from "react";

type tPageDef = {
  display: string;
  path: string;
  component: React.ReactNode;
};
import { AboutPage } from "./about/index";
import { BillOfMaterials } from "./bf_calculator";
import { BudgetAnalyzer } from "./budget";
import { BarcodeScannerEntry } from "./scanner";
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
  {
    display: "Qr Code Scanner",
    path: "qr_scanner",
    component: <BarcodeScannerEntry />,
  },
];
