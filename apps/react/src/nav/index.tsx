import React, { useContext, createContext, useState, useEffect } from "react";
import { NavComponentInternals } from "./component";

type Tprops = {
  //Add Props for Context
  children: any;
};

const InternalContext = createContext<
  ReturnType<typeof internalHook> | undefined
>(undefined);

export function External_NavBar(p: Tprops) {
  const hook = internalHook(p);

  return (
    <InternalContext.Provider value={hook}>
      <NavComponentInternals children={p.children} />
    </InternalContext.Provider>
  );
}
/**
 * hook to access and manipulate context
 * @returns
 */
export function useNavBarHook() {
  return useContext(InternalContext);
}

function internalHook(p: Tprops) {
  return {};
}
