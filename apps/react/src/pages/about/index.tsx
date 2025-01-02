import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { CardWrapper } from "../card";
import { AboutTabs } from "./tabs";
export function AboutPage() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <AboutTabs />
    </Container>
  );
}
