import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { StrictMode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  RedirectFunction,
  Navigate,
} from "react-router-dom";
import "./base.css";
import { External_NavBar } from "./nav";
import { AboutPage } from "./pages/about/index";
import { Box } from "@mui/material";
import { PlaygroundRoutes } from "./pages/playground";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Box sx={{ height: "100%" }}>
        <External_NavBar children={<AppRouter />} />
      </Box>
    </BrowserRouter>
  </StrictMode>
);

function AppRouter() {
  return (
    <Routes>
      <Route path="/app" element={<Navigate to="/app/about" />} />
      <Route path="/app/about" element={<AboutPage />} />
      <Route path="/app/playground/*" element={<PlaygroundRoutes />} />
      <Route path="/" element={<Navigate to="/app/about" />} />
      <Route path="" element={<Navigate to="/app/about" />} />
    </Routes>
  );
}
