import ReactDOM from "react-dom/client";
import React from "react";
import { StrictMode } from "react";
import "./base.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <h1>Hi</h1>
  </StrictMode>
);
