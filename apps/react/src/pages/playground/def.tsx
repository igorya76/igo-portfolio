export type TpgDef = {
  navDisplay: string;
  path: string;
  component: any;
  // about: () => { title: string; summary: string; details: string };
};
import React from "react";
import aboutBOM from "./bf_calculator/about";
import { BillOfMaterials } from "./bf_calculator/index";
import { BudgetAnalyzer } from "./budget";
import { BarcodeScannerEntry } from "./scanner";
import aboutBudget from "./budget/about";
import aboutScanner from "./sight_words/about";
import { SightWords } from "./sight_words";
import { SightWordsVoice } from "./sight_words_voice";
function defineDef(p: TpgDef): TpgDef {
  return p;
}
export const playGroundDef = {
  // bom: defineDef({
  //   navDisplay: "Bill of Materials",
  //   path: "billOfMaterials",
  //   component: <BillOfMaterials />,
  //   about: aboutBOM,
  // }),
  // budget: defineDef({
  //   navDisplay: "Job Budget",
  //   path: "jobbudget",
  //   component: <BudgetAnalyzer />,
  //   about: aboutBudget,
  // }),
  // scanner: defineDef({
  //   navDisplay: "Qr Code Scanner",
  //   path: "qr_scanner",
  //   component: <BarcodeScannerEntry />,
  //   about: aboutScanner,
  // }),
  scanner: defineDef({
    navDisplay: "SightWords",
    path: "sightwords",
    component: <SightWords />,
    // about: aboutScanner,
  }),
  scanner2: defineDef({
    navDisplay: "Sight Words Voice",
    path: "sightwordsvoice",
    component: <SightWordsVoice />,
    // about: aboutScanner,
  }),
};
