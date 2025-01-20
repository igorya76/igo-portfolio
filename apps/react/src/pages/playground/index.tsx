import { Route, Routes } from "react-router-dom";
import React from "react";
import { playGroundDef } from "./def";
export function PlaygroundRoutes() {
  return (
    <div>
      <Routes>
        {Object.keys(playGroundDef).map((k) => {
          const p = playGroundDef[k];
          return <Route path={`/${p.path}`} element={p.component} key={k} />;
        })}
      </Routes>
    </div>
  );
}
