import { Tabs, Tab, Box } from "@mui/material";
import React, { useMemo } from "react";
import { useValue } from "../../hooks";
import { ProfessionalExperience } from "./tab_professional_experience";
import { TabMe } from "./tab_me";
import { TabTechnologies } from "./tab_technologies";
const tabDef = {
  About: () => <TabMe />,
  "Professional Experience": () => <ProfessionalExperience />,
  Technologies: () => <TabTechnologies />,
  Playground: () => <></>,
};

export function AboutTabs() {
  const activeIndex = useValue<keyof typeof tabDef>("Professional Experience");
  const Component = useMemo(() => {
    return tabDef[activeIndex.value];
  }, [activeIndex.value]);
  return (
    <Box
      sx={{
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Tabs value={activeIndex.value}>
        {Object.keys(tabDef).map((t, k) => (
          <Tab
            value={t}
            label={t}
            key={k}
            onClick={() => activeIndex.set(t as any)}
          />
        ))}
      </Tabs>
      <Box sx={{ padding: "10px" }}>
        <Component />
      </Box>
    </Box>
  );
}
