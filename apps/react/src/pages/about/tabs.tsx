import { Tabs, Tab, Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useValue } from "../../hooks";
import { ProfessionalExperience } from "./tab_professional_experience";
import { TabMe } from "./tab_me";
import { TabTechnologies } from "./tab_technologies";
import { TabPlayground } from "./tab_playground";
import { useLocation, useNavigate } from "react-router-dom";
const tabDef = {
  About: () => <TabMe />,
  Experience: () => <ProfessionalExperience />,
  Technologies: () => <TabTechnologies />,
  Playground: () => <TabPlayground />,
};

function indexOfHash(hash: string) {
  let index = Object.keys(tabDef).findIndex((k) => k === hash.replace("#", ""));
  const findIndex = index < 0 ? 0 : index;
  return Object.keys(tabDef)[findIndex];
}
export function AboutTabs() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const index = indexOfHash(hash);
  console.log({ index });

  const Component = useMemo(() => {
    return tabDef[index];
  }, [index]);
  return (
    <Box
      sx={{
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Tabs value={index}>
        {Object.keys(tabDef).map((t, k) => (
          <Tab
            value={t}
            label={t}
            key={k}
            onClick={() => {
              console.log({ pathname, hash });

              navigate(`${pathname}#${t}`);
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ padding: "10px" }}>
        <Component />
      </Box>
    </Box>
  );
}
